import React from "react";
import { useForm } from "react-hook-form";
import { useLoaderData } from "react-router";
import beARider from "../../assets/agent-pending.png";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import toast from "react-hot-toast";
const BeARider = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const region = watch("region");
  const serviceData = useLoaderData();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const onSubmit = (data) => {
    const riderData = {
      ...data,
      status: "pending",
      created_at: new Date().toISOString(),
    };
    console.log("Rider Form Submitted:", riderData);
    axiosSecure.post("/riders", riderData).then((res) => {
      if (res.data.insertedId) {
        toast.success("Application Submitted");
      }
    });
    reset();
  };

  const uniqueRegions = [...new Set(serviceData.map((d) => d.region))];

  const allDistricts = serviceData.filter(
    (district) => district.region === region
  );

  return (
    <div className="bg-gray-100 ">
      <div className="max-w-screen-2xl rounded-2xl bg-base-100 w-11/12 mx-auto p-10">
        <h1 className="text-3xl text-[#03373D] md:text-4xl font-bold mb-2">
          Be a Rider
        </h1>
        <p className=" text-gray-600 md:w-7/12 mb-6">
          Enjoy fast, reliable parcel delivery with real-time tracking and zero
          hassle. From personal packages to business shipments — we deliver on
          time, every time.
        </p>
        <hr className="mb-6 text-gray-300 " />
        <h2 className="text-2xl text-[#03373D] font-semibold mb-6">
          Tell us about yourself
        </h2>

        <div className="grid md:grid-cols-2 gap-10 items-start">
          {/* Left: Form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4 **:focus:outline-none"
          >
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block font-medium">Your Name</label>
                <input
                  type="text"
                  defaultValue={user?.displayName}
                  readOnly
                  {...register("name", { required: true })}
                  className="input input-bordered w-full"
                />
              </div>

              <div>
                <label className="block font-medium">Your Age</label>
                <input
                  type="number"
                  placeholder="Enter your age"
                  {...register("age", { required: true })}
                  className="input input-bordered w-full"
                />
                {errors.age && (
                  <p className="text-red-500 text-sm">Age is required</p>
                )}
              </div>

              <div>
                <label className="block font-medium">Email</label>
                <input
                  type="email"
                  defaultValue={user?.email}
                  readOnly
                  placeholder="example@email.com"
                  className="input input-bordered w-full"
                />
              </div>

              <div>
                <label className="block font-medium">Contact</label>
                <input
                  type="text"
                  placeholder="01XXXXXXXXX"
                  {...register("contact", { required: true })}
                  className="input input-bordered w-full"
                />
                {errors.contact && (
                  <p className="text-red-500 text-sm">Contact is required</p>
                )}
              </div>

              <div>
                <label className="block font-medium">Region</label>
                <select
                  {...register("region", { required: true })}
                  className="select select-bordered w-full"
                >
                  <option value="">Select Region</option>
                  {uniqueRegions.map((region, i) => (
                    <option key={i} value={region}>
                      {region}
                    </option>
                  ))}
                </select>
                {errors.region && (
                  <p className="text-red-500 text-sm">Region is required</p>
                )}
              </div>

              <div>
                <label className="block font-medium">
                  Service Center (District)
                </label>
                <select
                  {...register("district", { required: true })}
                  className="select select-bordered w-full"
                >
                  <option value="">Select District</option>
                  {allDistricts?.map((dis, i) => (
                    <option key={i} value={dis.district}>
                      {dis.district}
                    </option>
                  ))}
                </select>
                {errors.district && (
                  <p className="text-red-500 text-sm">District is required</p>
                )}
              </div>

              <div>
                <label className="block font-medium">Your License</label>
                <input
                  type="text"
                  placeholder="Driving license number"
                  {...register("license", { required: true })}
                  className="input input-bordered w-full"
                />
                {errors.license && (
                  <p className="text-red-500 text-sm">License is required</p>
                )}
              </div>

              <div>
                <label className="block font-medium">Bike License</label>
                <input
                  type="text"
                  placeholder="Bike license number"
                  {...register("bikeLicense", { required: true })}
                  className="input input-bordered w-full"
                />
                {errors.bikeLicense && (
                  <p className="text-red-500 text-sm">
                    Bike license is required
                  </p>
                )}
              </div>
            </div>

            <div className="col-span-2">
              <label className="block font-medium">
                Which warehouse you want to work
              </label>
              <input
                type="text"
                placeholder="Enter warehouse name or location"
                {...register("warehouse", { required: true })}
                className="input input-bordered w-full"
              />
              {errors.warehouse && (
                <p className="text-red-500 text-sm">This field is required</p>
              )}
            </div>

            <button className="btn btn-primary text-gray-800 w-full mt-4">
              Submit
            </button>
          </form>

          {/* Right: Image */}
          <div>
            <img
              src={beARider}
              alt="Be a Rider"
              className="rounded-lg w-full object-cover flex items-center justify-center max-h-[400px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BeARider;
