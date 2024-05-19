"use client";
import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";
import { GoogleLogin } from "@react-oauth/google";
import { useRouter } from "next/navigation";
import { axiosInstance } from "@/app/configs/axiosConfig";
import { useAuth } from "../configs/globalState";
const Login = () => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();
  let router = useRouter();
  let setUser = useAuth((state: any) => state.setUser);
  return (
    <div className="w-full  flex-col flex justify-center items-center">
      <form
        onSubmit={handleSubmit(async (data) => {
          try {
            let response = await axiosInstance.post("/api/user/login", data);
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
