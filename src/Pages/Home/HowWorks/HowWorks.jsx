import React from "react";
import car from "../../../assets/bookingIcon.png";
const HowWorks = () => {
  const delivery = [
    {
      id: 1,
      question: "Booking Pick & Drop?",
      answer:
        "Booking Pick & Drop is a convenient service that allows customers to schedule parcel pickups from their location and have them delivered to the destination without visiting a delivery center.",
    },
    {
      id: 2,
      question: "Cash On Delivery work?",
      answer:
        "Cash On Delivery (COD) allows customers to pay for their parcels upon delivery. Our delivery agents collect the payment and deposit it securely to your account.",
    },
    {
      id: 3,
      question: "Delivery Hub?",
      answer:
        "A Delivery Hub is a centralized location where parcels are received, sorted, and dispatched for final delivery. It helps ensure faster and more organized shipping operations.",
    },
    {
      id: 4,
      question: "Booking SME & Corporate?",
      answer:
        "Booking SME & Corporate is a specialized service tailored for small businesses and corporate clients. It offers bulk shipping solutions, dedicated support, and flexible payment options.",
    },
  ];

  return (
    <div className="bg-gray-100 pt-2 pb-16">
      <div className="max-w-screen-2xl w-11/12 mx-auto">
      <h1 className="text-3xl md:text-4xl font-bold text-[#03373D] my-5">How it Works</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {delivery.map((cart) => (
            <div key={cart.id} className="bg-base-100 rounded-2xl space-y-3 p-5">
              <img src={car} alt="" />
              <h3 className="text-xl font-semibold text-[#03373D]">
                {cart.question}
              </h3>
              <p className="text-base text-[#606060]">{cart.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HowWorks;
