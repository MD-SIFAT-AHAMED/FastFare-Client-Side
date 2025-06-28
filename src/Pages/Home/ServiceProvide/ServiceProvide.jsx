import React from "react";
import location from "../../../assets/live-tracking.png";
import call from "../../../assets/safe-delivery.png";
// Sample images – replace these with real image paths or imports
const services = [
  {
    id: 1,
    title: "Live Parcel Tracking",
    description:
      "Stay updated in real-time with our live parcel tracking feature. From pick-up to delivery, monitor your shipment's journey and get instant status updates for complete peace of mind.",
    img: location,
  },
  {
    id: 2,
    title: "100% Safe Delivery",
    description:
      "We ensure your parcels are handled with the utmost care and delivered securely to their destination. Our reliable process guarantees safe and damage-free delivery every time.",
    img: call,
  },
  {
    id: 3,
    title: "24/7 Call Center Support",
    description:
      "Our dedicated support team is available around the clock to assist you with any questions, updates, or delivery concerns—anytime you need us.",
    img: call,
  },
];

const ServiceProdive = () => {
  return (
    <div className="bg-gray-100 py-10">
      <div className="max-w-screen-2xl w-11/12 mx-auto py-15 space-y-8 border-y border-dashed border-gray-600 ">
        {services.map((service) => (
          <div
            key={service.id}
            data-aos="zoom-in"
            data-aos-duration="1000"
            className="card w-full text-center md:text-start bg-base-100 rounded-2xl flex flex-col md:flex-row items-center p-5 md:px-10"
          >
            {/* Left image section */}
            <div className="">
              <img src={service.img} alt={service.title} className="" />
            </div>

            {/* Devided */}
            <div className="hidden md:block h-35 border-l-2 border-dashed border-[#03373D] mx-10"></div>

            {/* Right text section */}
            <div className="md:w-2/3 w-full p-5 ">
              <h2 className="text-2xl font-bold text-[#03373D] mb-2">
                {service.title}
              </h2>
              <p className="text-gray-600">{service.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceProdive;
