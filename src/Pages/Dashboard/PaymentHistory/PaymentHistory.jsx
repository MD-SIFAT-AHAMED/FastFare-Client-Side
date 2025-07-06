import React from "react";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { isPending, data: payments = [] } = useQuery({
    queryKey: ["payments", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments/user/${user.email}`);
      return res.data;
    },
  });

  if (isPending) {
    return "....Loading";
  }
  console.log(payments);
  return (
    <div className="overflow-x-auto rounded-lg ">
      <table className="table w-full">
        <thead className="bg-base-200 text-sm">
          <tr>
            <th>#</th>
            <th>Parcel ID</th>
            <th>User Email</th>
            <th>Amount</th>
            <th>Transaction ID</th>
            <th>Paid At</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment, index) => (
            <tr key={index} className="hover">
              <td>{index + 1}</td>
              <td>{payment.parcelId}</td>
              <td>{payment.userEmail}</td>
              <td>${payment.amount}</td>
              <td className="truncate max-w-[180px]">
                {payment.transactionId}
              </td>
              <td>{new Date(payment.paid_at).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentHistory;
