import React from "react";
import { useForm } from "react-hook-form";

const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div>
      <div className="mb-3 space-y-2">
        <h3 className="text-3xl md:text-4xl font-extrabold">
          Forgot Password{" "}
        </h3>
        <p className="font-semibold">
          Enter your email address and we'll send you a reset link.
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="**:text-black md:**:text-base **:focus:outline-none *:w-full "
      >
        <fieldset className="fieldset">
          <label className="label">Email</label>
          <input
            type="email"
            className="input w-full"
            placeholder="Email"
            {...register("email", { required: true })}
          />
          {errors.email?.type === "required" && (
            <p className="!text-red-500">Please Enter Your Email</p>
          )}

          <button className="btn btn-primary font-medium text-black mt-4">
            Send
          </button>
        </fieldset>
      </form>
    </div>
  );
};

export default ForgotPassword;
