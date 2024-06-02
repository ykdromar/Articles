"use client";
export const fetchCache = "force-no-store";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { GoogleLogin } from "@react-oauth/google";
import { useAuth } from "../core/configs/useAuth";
import AuthAPI from "../core/api/authAPI";
const Signup = () => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();
  let router = useRouter();

  const { signup, googleSignup } = AuthAPI();
  const user = useAuth((state: any) => state.user);

  useEffect(() => {
    if (user != null && user != undefined) {
      router.replace("/");
      reset();
    }
  }, [reset, router, user]);

  return (
    <div className="w-full  flex flex-col justify-center items-center">
      <form
        onSubmit={handleSubmit((data) => {
          signup(data);
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
            googleSignup(credentialResponse);
          }}
          onError={() => {
            console.log("Google Signup Failed");
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
