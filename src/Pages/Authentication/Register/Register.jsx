import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaRegEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { IoEyeOutline } from "react-icons/io5";
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../../../Hooks/useAuth";
import toast from "react-hot-toast";
import axios from "axios";
import useAxios from "../../../Hooks/useAxios";

const Register = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [showPassword, setShowPassword] = useState(true);
  const { createUser, updateUserData, loginWithGoggle } = useAuth();
  const [profileImg, setProfileImg] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const axiosInstance = useAxios();

  const onSubmit = (data) => {
    //

    const userData = {
      displayName: data.name,
      photoURL: profileImg,
    };
    createUser(data.email, data.password)
      .then(async () => {
        // Update userInfo in the database
        const userInfo = {
          email: data.email,
          role: "user", //default role
          create_at: new Date().toISOString(),
          last_log_in: new Date().toISOString(),
        };

        const userRes = await axiosInstance.post("/users", userInfo);
        console.log(userRes);
        // Update user profile in firebase
        updateUserData(userData)
          .then(() => {
            toast.success("Login Successfuly");
            navigate(location.state?.from || "/");
          })
          .catch((err) => {
            toast.error(err.code);
          });
      })
      .catch((err) => {
        toast.error(err.code);
      });
    // Form value reset
    reset();
  };

  const handleImageUpload = async (e) => {
    const image = e.target.files[0];
    const formData = new FormData();
    formData.append("image", image);
    const imageUrl = `https://api.imgbb.com/1/upload?key=${
      import.meta.env.VITE_image_upload_api
    }`;
    const res = await axios.post(imageUrl, formData);
    setProfileImg(res.data.data.url);
  };

  const handlerLoginWithGoogle = () => {
    loginWithGoggle()
      .then(async (result) => {
        const user = result.user;
        // Update userInfo in the database
        const userInfo = {
          email: user.email,
          role: "user", //default role
          create_at: new Date().toISOString(),
          last_log_in: new Date().toISOString(),
        };
        const userRes = await axiosInstance.post("/users", userInfo);

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
        <h3 className="text-3xl md:text-4xl font-extrabold">
          Create an Account
        </h3>
        <p className="font-semibold">Register with FastFare</p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="**:text-black w-xs md:w-md md:**:text-base **:focus:outline-none *:w-full "
      >
        <fieldset className="fieldset">
          <label className="label font-medium">Name</label>
          <input
            type="text"
            className="input w-full"
            placeholder="Name"
            {...register("name", { required: true })}
          />
          {errors.email?.type === "required" && (
            <p className="!text-red-500">Please Enter Your Name</p>
          )}

          <label className="label font-medium">Image</label>
          <input
            onChange={handleImageUpload}
            type="file"
            className="file-input w-full "
            placeholder="Upload your image"
          />

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

          <button className="btn btn-primary font-medium text-black mt-4">
            Register
          </button>
        </fieldset>
        <p className="my-2">
          Already have an account?{" "}
          <Link to={"/login"}>
            <span className="!text-[#8FA748] hover:underline">Login</span>
          </Link>
        </p>
        <p className="text-center">Or</p>
      </form>

      <button
        onClick={handlerLoginWithGoogle}
        className="btn w-xs md:w-md bg-gray-100"
      >
        <FcGoogle size={20} />
        Register With Google
      </button>
    </div>
  );
};

export default Register;
