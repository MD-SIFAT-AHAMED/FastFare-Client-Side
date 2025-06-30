import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useLoaderData } from "react-router";

const SendParcel = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const [showConfirm, setShowConfirm] = useState(false);
  const [cost, setCost] = useState(0);
  const type = watch("type");
  const senderRegion = watch("senderRegion");
  const receiverRegion = watch("receiverRegion");
  const allDistrict = useLoaderData();

  const calculateCost = (data) => {
    const isSameCity = data.senderRegion === data.receiverRegion;
    const weight = parseFloat(data.weight || 0);

    if (data.type === "document") {
      return isSameCity ? 60 : 80;
    }

    if (data.type === "non-document") {
      if (weight <= 3) {
        return isSameCity ? 110 : 150;
      } else {
        const extraPerKg = 40;
        const base = isSameCity ? 110 : 150 + 40; // extra 40 for outside city
        const extraWeightCost = (weight - 3) * extraPerKg;
        return base + extraWeightCost;
      }
    }

    return 0; // fallback
  };

  const onSubmit = (data) => {
    const calculatedCost = calculateCost(data);
    setCost(calculatedCost);
    setShowConfirm(true);
    toast.success(`Estimated Delivery Cost: ৳${calculatedCost}`);
  };

  const confirmSubmit = (data) => {
    const parcelData = {
      ...data,
      creation_date: new Date().toISOString(),
    };
    console.log("Saving to DB:", parcelData);
    toast.success("Parcel information saved successfully!");
    reset();
    setShowConfirm(false);
  };

  return (
    <div className="bg-gray-100">
      <div className="max-w-screen-2xl w-11/12 bg-base-100 rounded-2xl mx-auto">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6 **:focus:outline-none p-6 max-w-6xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#03373D]">
            Add Parcel
          </h2>
          {/* Parcel Info */}
          <div className="rounded-lg">
            <h2 className="text-xl md:text-2xl font-semibold mb-4 text-[#03373D]">
              Enter your parcel Details
            </h2>
            <div className="flex flex-col gap-4">
              <div>
                <div className="flex gap-4 mt-1">
                  <label className="label cursor-pointer">
                    <input
                      type="radio"
                      value="document"
                      {...register("type", { required: true })}
                      className="radio radio-primary"
                    />{" "}
                    <span className="ml-2">Document</span>
                  </label>
                  <label className="label cursor-pointer">
                    <input
                      type="radio"
                      value="non-document"
                      {...register("type", { required: true })}
                      className="radio radio-primary"
                    />{" "}
                    <span className="ml-2">Non-Document</span>
                  </label>
                </div>
                {errors.type && (
                  <p className="text-red-500">Parcel type is required</p>
                )}
              </div>

              <div>
                <label className="font-medium">Parcel Name:</label>
                <input
                  type="text"
                  placeholder="Parcel Title"
                  {...register("title", { required: true })}
                  className="input input-bordered w-full mt-1"
                />
                {errors.title && (
                  <p className="text-red-500">Parcel Name is required</p>
                )}
              </div>

              {type === "non-document" && (
                <div>
                  <label className="font-medium">Parcel Weight (KG):</label>
                  <input
                    type="number"
                    step="0.1"
                    placeholder="Weight (kg)"
                    {...register("weight")}
                    className="input input-bordered w-full mt-1"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Sender & Receiver Wrapper */}
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Sender Info */}
            <div className="flex-1 p-4 rounded-lg">
              <h2 className="text-xl font-bold text-[#03373D] mb-4">
                Sender Details
              </h2>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="font-medium">Sender Name:</label>
                    <input
                      type="text"
                      placeholder="Sender Name"
                      {...register("senderName")}
                      className="input input-bordered w-full mt-1"
                    />
                  </div>
                  <div>
                    <label className="font-medium">Sender Contact No:</label>
                    <input
                      type="text"
                      placeholder="Sender Contact"
                      {...register("senderContact", { required: true })}
                      className="input input-bordered w-full mt-1"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="font-medium">Your Region:</label>
                    <select
                      {...register("senderRegion", { required: true })}
                      className="select select-bordered w-full mt-1"
                    >
                      <option value="">Select Region</option>
                      {[
                        ...new Set(
                          allDistrict.map((distirct) => distirct.region)
                        ),
                      ].map((region, i) => (
                        <option key={i} value={region}>
                          {region}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="font-medium">Service Center:</label>
                    <select
                      {...register("senderCenter", { required: true })}
                      className="select select-bordered w-full mt-1"
                    >
                      <option value="">Select Center</option>

                      {allDistrict
                        .filter((district) => district.region === senderRegion)
                        .map((dist, i) => (
                          <option key={i} value={dist.district}>
                            {dist.district}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="font-medium">Address:</label>
                  <input
                    type="text"
                    placeholder="Sender Address"
                    {...register("senderAddress", { required: true })}
                    className="input input-bordered w-full mt-1"
                  />
                </div>
                <div>
                  <label className="font-medium">Pick Up Instruction:</label>
                  <input
                    type="text"
                    placeholder="Pick up Instruction"
                    {...register("pickupInstruction", { required: true })}
                    className="input input-bordered w-full mt-1"
                  />
                </div>
              </div>
            </div>

            {/* Receiver Info */}
            <div className="flex-1  p-4 rounded-lg">
              <h2 className="text-xl text-[#03373D] font-bold mb-4">
                Receiver Details
              </h2>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="font-medium">Receiver Name:</label>
                    <input
                      type="text"
                      placeholder="Receiver Name"
                      {...register("receiverName", { required: true })}
                      className="input input-bordered w-full mt-1"
                    />
                  </div>
                  <div>
                    <label className="font-medium"> Receiver Contact No:</label>
                    <input
                      type="text"
                      placeholder="Receiver Contact"
                      {...register("receiverContact", { required: true })}
                      className="input input-bordered w-full mt-1"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="font-medium">Your Region:</label>
                    <select
                      {...register("receiverRegion", { required: true })}
                      className="select select-bordered w-full mt-1"
                    >
                      <option value="">Select Region</option>
                      {[
                        ...new Set(
                          allDistrict.map((distirct) => distirct.region)
                        ),
                      ].map((region, i) => (
                        <option key={i} value={region}>
                          {region}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="font-medium">Service Center:</label>
                    <select
                      {...register("receiverCenter", { required: true })}
                      className="select select-bordered w-full mt-1"
                    >
                      <option value="">Select Center</option>
                      {allDistrict
                        .filter(
                          (district) => district.region === receiverRegion
                        )
                        .map((dist, i) => (
                          <option key={i} value={dist.district}>
                            {dist.district}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="font-medium">Address:</label>
                  <input
                    type="text"
                    placeholder="Receiver Address"
                    {...register("receiverAddress", { required: true })}
                    className="input input-bordered w-full mt-1"
                  />
                </div>
                <div>
                  <label className="font-medium">Delivery Instruction:</label>
                  <input
                    type="text"
                    placeholder="Delivery Instruction"
                    {...register("deliveryInstruction", { required: true })}
                    className="input input-bordered w-full mt-1"
                  />
                </div>
              </div>
            </div>
          </div>
          <p className="font-medium">* PickUp Time 4pm-7pm Approx.</p>

          <button
            type="submit"
            className="btn btn-primary !text-gray-700 font-bold w-full"
          >
            Proceed to Confirm Booking
          </button>

          {showConfirm && (
            <div className="fixed inset-0 bg-white/80 bg-opacity-40 flex justify-center items-center z-50">
              <div className="bg-white p-6 rounded-lg shadow-xl w-[90%] max-w-md text-center">
                <p className="text-xl font-semibold text-gray-800 mb-4">
                  Estimated Cost:{" "}
                  <span className="text-green-600">৳{cost}</span>
                </p>
                <button
                  type="button"
                  className="btn btn-primary text-gray-700 font-bold w-full"
                  onClick={handleSubmit(confirmSubmit)}
                >
                  Confirm
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default SendParcel;
