"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { GoogleLogin } from "@react-oauth/google";
import { useRouter } from "next/navigation";
import Auth from "../core/api/auth";
import { useAuth } from "../core/configs/useAuth";
const Login = () => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();
  let router = useRouter();

  const { login, googleSignup } = Auth();
  const user = useAuth((state: any) => state.user);

  useEffect(() => {
    if (user != null && user != undefined) {
      router.replace("/");
      reset();
    }
  }, [reset, router, user]);

  return (
    <div className="w-full  flex-col flex justify-center items-center">
      <form
        onSubmit={handleSubmit((data) => {
          login(data);
        })}
        className="w-3/12 min-w-56 flex flex-col items-center"
      >
        <h1 className="text-xl font-semibold my-3">Login</h1>
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
            Login
          </button>
        </div>
      </form>
      <div className="mt-3">
        <GoogleLogin
          onSuccess={async (credentialResponse) => {
            googleSignup(credentialResponse);
          }}
          onError={() => {
            console.log("Login Failed");
          }}
        />
      </div>
      <div className="mt-5 text-m font-medium">
        Don&apos;t have an account?{" "}
        <Link className="font-semibold" href="/signup">
          Signup
        </Link>
      </div>
    </div>
  );
};

export default Login;
