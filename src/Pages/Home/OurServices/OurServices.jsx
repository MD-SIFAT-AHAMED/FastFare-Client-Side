import React from "react";
import {
  FaShippingFast,
  FaMapMarkedAlt,
  FaWarehouse,
  FaMoneyBillWave,
  FaBuilding,
  FaUndoAlt,
} from "react-icons/fa";

const services = [
  {
    title: "Express & Standard Delivery",
    description:
      "We deliver parcels within 24–72 hours in Dhaka, Chittagong, Sylhet, Khulna, and Rajshahi. Express delivery available in Dhaka within 4–6 hours from pick-up to drop-off.",
    icon: <FaShippingFast className="text-7xl text-[#fda29b]" />,
  },
  {
    title: "Nationwide Delivery",
    description:
      "We deliver parcels nationwide with home delivery in every district, ensuring your products reach customers within 48–72 hours.",
    icon: <FaMapMarkedAlt className="text-7xl text-[#fda29b]" />,
  },
  {
    title: "Fulfillment Solution",
    description:
      "We also offer customized service with inventory management support, online order processing, packaging, and after sales support.",
    icon: <FaWarehouse className="text-7xl text-[#fda29b]" />,
  },
  {
    title: "Cash on Home Delivery",
    description:
      "100% cash on delivery anywhere in Bangladesh with guaranteed safety of your product.",
    icon: <FaMoneyBillWave className="text-7xl text-[#fda29b]" />,
  },
  {
    title: "Corporate Service / Contract In Logistics",
    description:
      "Customized corporate services which includes warehouse and inventory management support.",
    icon: <FaBuilding className="text-7xl text-[#fda29b]" />,
  },
  {
    title: "Parcel Return",
    description:
      "Through our reverse logistics facility we allow end customers to return or exchange their products with online business merchants.",
    icon: <FaUndoAlt className="text-7xl text-[#fda29b]" />,
  },
];

const OurServices = () => {
  return (
    <div className="max-w-screen-2xl w-11/12 mx-auto bg-[#03373D] px-12 py-[80px] lg:px-[110px] lg:py-[100px] rounded-4xl my-10">
      <div className="text-center mb-12">
        <h2 className="text-3xl text-white md:text-4xl font-bold mb-4">
          Our Services
        </h2>
        <p className="text-[#DADADA] max-w-2xl mx-auto">
          Enjoy fast, reliable parcel delivery with real-time tracking and zero
          hassle. From personal packages to business shipments — we deliver on
          time, every time.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <div
            key={index}
            data-aos="zoom-in"
            data-aos-duration="1000"
            className="card bg-base-100 shadow-md rounded-3xl border border-gray-200 hover:bg-[#caeb66] transition-transform duration-300 ease-in-out hover:scale-105"
          >
            <div className="card-body items-center text-center">
              {service.icon}
              <h3 className="card-title font-bold text-[#03373d] mt-3e text-xl ">
                {service.title}
              </h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OurServices;
