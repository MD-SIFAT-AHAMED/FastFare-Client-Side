import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaRegEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { IoEyeOutline } from "react-icons/io5";
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../../../Hooks/useAuth";
import toast from "react-hot-toast";

const Login = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [showPassword, setShowPassword] = useState(true);
  const { signIn, loginWithGoggle } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    console.log(data);
    signIn(data.email, data.password)
      .then(() => {
        toast.success("Login Successfuly");
        navigate(location.state?.from || "/");
      })
      .catch((err) => {
        toast.error(err.code);
      });
    // Form value reset
    reset();
  };

  const handlerLoginWithGoogle = () => {
    loginWithGoggle()
      .then(() => {
        toast.success("Login Successfuly");
        navigate(location.state?.from || "/");
      })
      .catch((err) => {
        toast.error(err.code);
      });
  };

  return (
    <div className="">
      <div className="mb-3 space-y-2">
        <h3 className="text-3xl md:text-4xl font-extrabold">Welcome Back</h3>
        <p className="font-semibold">Login with FastFare</p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="**:text-black w-xs md:w-md md:**:text-base **:focus:outline-none *:w-full "
      >
        <fieldset className="fieldset">
          <label className="label font-medium">Email</label>
          <input
            type="email"
            className="input w-full"
            placeholder="Email"
            {...register("email", { required: true })}
          />
          {errors.email?.type === "required" && (
            <p className="!text-red-500">Please Enter Your Email</p>
          )}

          <label className="label font-medium">Password</label>
          <div className="relative">
            <input
              type={`${showPassword ? "password" : "text"}`}
              className="input w-full"
              placeholder="Password"
              {...register("password", { required: true, minLength: 6 })}
            />
            <div
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute bottom-3 right-4 z-10"
            >
              {showPassword ? (
                <FaRegEyeSlash size={15} />
              ) : (
                <IoEyeOutline size={15} />
              )}
            </div>
          </div>

          {errors.password?.type === "required" && (
            <p className="!text-red-500">Please Enter Your Password</p>
          )}
          {errors.password?.type === "minLength" && (
            <p className="!text-red-500">
              Password Must be 6 characters or longer{" "}
            </p>
          )}

          <div>
            <Link to={"/forgotPassword"}>
              <p className="link link-hover">Forgot password?</p>
            </Link>
          </div>
          <button className="btn btn-primary font-medium text-black mt-4">
            Login
          </button>
        </fieldset>
        <p className="my-2">
          Don't have any account?{" "}
          <Link to={"/register"}>
            <span className="!text-[#8FA748] hover:underline">Register</span>
          </Link>
        </p>
        <p className="text-center">Or</p>
      </form>
      <button
        onClick={handlerLoginWithGoogle}
        className="btn w-xs md:w-md  bg-gray-100"
      >
        <FcGoogle size={20} />
        LogIn With Google
      </button>
    </div>
  );
};

export default Login;
