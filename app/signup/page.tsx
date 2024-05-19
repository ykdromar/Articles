"use client";
import React from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { axiosInstance } from "@/app/configs/axiosConfig";
import { useAuth } from "../configs/globalState";
import { GoogleLogin } from "@react-oauth/google";
const Signup = () => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();
  let router = useRouter();
  let setUser = useAuth((state: any) => state.setUser);
  return (
    <div className="w-full  flex flex-col justify-center items-center">
      <form
        onSubmit={handleSubmit(async (data) => {
          try {
            if (data.password !== data.confirm_password) {
              window.alert("Password & Confirm Password not match");
              return;
            }
            let response = await axiosInstance.post("/api/user/signup", data);
            let responseBody = response.data;
            if (responseBody.success == true) {
              setUser(responseBody.body.user);
              router.push("/");
              reset();
            }
          } catch (e) {
            console.log(e);
          }
        })}
        className="w-3/12 min-w-56 flex flex-col items-center"
      >
        <h1 className="text-xl font-semibold my-3">Sign up</h1>
        <label className="form-control w-full ">
          <div className="label">
            <span className="label-text">Name</span>
          </div>
          <input
            type="text"
            {...register("name", { required: true })}
            placeholder="Name"
            className="input input-bordered w-full"
          />
        </label>
        <label className="form-control w-full ">
          <div className="label">
            <span className="label-text">Email Id</span>
          </div>
          <input
            type="email"
            {...register("email", { required: true })}
            placeholder="Email Id"
            className="input input-bordered w-full"
          />
        </label>
        <label className="form-control w-full ">
          <div className="label">
            <span className="label-text">Password</span>
          </div>
          <input
            type="password"
            {...register("password", { required: true })}
            placeholder="Password"
            className="input input-bordered w-full"
          />
        </label>
        <label className="form-control w-full ">
          <div className="label">
            <span className="label-text">Confirm Password</span>
          </div>
          <input
            type="password"
            {...register("confirm_password", { required: true })}
            placeholder="Password"
            className="input input-bordered w-full"
          />
        </label>
        <div className="w-full flex justify-evenly mt-3">
          <button
            type="reset"
            onClick={() => {
              reset();
            }}
            className="btn"
          >
            Clear
          </button>
          <button type="submit" className={`btn btn-neutral`}>
            Signup
          </button>
        </div>
      </form>
      <div className="mt-3">
        <GoogleLogin
          onSuccess={async (credentialResponse) => {
            try {
              let response = await axiosInstance.post(
                "/api/user/googleSignin",
                credentialResponse
              );
              let responseBody = response.data;
              if (responseBody.success == true) {
                setUser(responseBody.body.user);
                router.push("/");
                reset();
              }
            } catch (e) {
              console.log(e);
            }
          }}
          onError={() => {
            console.log("Login Failed");
          }}
        />
      </div>
      <div className="mt-2 text-m font-medium">
        Already have an account ?{" "}
        <Link className="font-semibold" href="/login">
          Login
        </Link>
      </div>
    </div>
  );
};

export default Signup;
