"use client";
import React from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
const Signup = () => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();
  return (
    <div className="w-full pt-16 h-screen flex flex-col justify-center items-center">
      <form
        onSubmit={handleSubmit(async (data) => {
          console.log(data);
          //   reset();
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
      <div className="my-3 text-m font-medium">
        Already have an account ?{" "}
        <Link className="font-semibold" href="/login">
          Login
        </Link>
      </div>
    </div>
  );
};

export default Signup;
