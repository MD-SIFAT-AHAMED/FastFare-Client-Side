import React from "react";
import merchant from "../../../assets/location-merchant.png";
const BeMerchant = () => {
  return (
    <div className="bg-gray-100">
      <div className="max-w-screen-2xl w-11/12 mx-auto ">
        <div>
          <div className="bg-[#03373D] bg-[url('assets/be-a-merchant-bg.png')] bg-no-repeat rounded-4xl p-5 md:p-20 overflow-hidden">
            <div className="hero-content flex-col lg:flex-row-reverse">
              <img src={merchant} className="w-70 md:w-[400px]" />
              <div>
                <h1 className=" text-3xl md:text-5xl text-white font-bold">
                  Merchant and Customer Satisfaction is Our First Priority
                </h1>
                <p className="py-6 text-[#DADADA]">
                  We offer the lowest delivery charge with the highest value
                  along with 100% safety of your product. Pathao courier
                  delivers your parcels in every corner of Bangladesh right on
                  time.
                </p>
                <div className="flex flex-col md:flex-row gap-3">
                  <button className="btn btn-primary font-bold text-black rounded-full">
                    Become a Merchant
                  </button>
                  <button className="btn btn-primary text-primary btn-outline hover:text-black font-bold rounded-full">
                    Earn with Profast Courier
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BeMerchant;
