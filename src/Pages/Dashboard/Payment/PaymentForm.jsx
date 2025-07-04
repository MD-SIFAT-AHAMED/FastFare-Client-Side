import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import toast from "react-hot-toast";
import useAuth from "../../../Hooks/useAuth";

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const { parcelId } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { isPending, data: parcelInfo = {} } = useQuery({
    queryKey: ["parcels", parcelId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels/${parcelId}`);
      return res.data;
    },
  });

  if (isPending) {
    return "...laoding";
  }

  console.log(parcelInfo);
  const amount = parcelInfo.data.cost;
  const amountInCents = amount * 100;
  console.log(amountInCents);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    //  step 1: validate the card
    const card = elements.getElement(CardElement);
    if (!card) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setError(error.message);
    } else {
      setError(null);
      console.log("paymentMethod", paymentMethod);

      // step 2: create payment intent
      const res = await axiosSecure.post("/create-payment-intent", {
        amount: amountInCents,
        parcelId,
      });
      const clientSecret = res.data.clientSecret;

      //step-3:  confirm payment
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card,
          billing_details: {
            name: user.displayName,
            email: user.email,
          },
        },
      });
      console.log(result)
      if (result.error) {
        setError(result.error.message);
      } else {
        if (result.paymentIntent.status === "succeeded") {
          setError(null);

          // step-4: mark parcel paid also create payment history
          const paymentData = {
            parcelId,
            userEmail: user.email,
            amount,
            transactionId: result.paymentIntent.id,
            // paymentMethod: result.paymentIntent.payment_method_types,
          };
          const paymentRes = await axiosSecure.post("/payments", paymentData);
          console.log("hi", paymentRes);
          if (paymentRes.data.paymentId) {
            toast.success("Payment Successful");
            navigate("/dashboard/myParcels");
          }
        }
      }
      console.log(result);
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="max-w-md p-4 bg-white rounded shadow"
      >
        <CardElement className="p-2 border border-gray-300 rounded" />
        {error && <p className="text-red-600">{error}</p>}

        <button
          className="mt-4 w-full btn btn-primary text-gray-700  rounded"
          type="submit"
          disabled={!stripe}
        >
          Pay ${amount}
        </button>
      </form>
    </div>
  );
};

export default PaymentForm;
