"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useAuth } from "../configs/globalState";
import { useRouter } from "next/navigation";
import { axiosInstance } from "@/app/configs/axiosConfig";
const Navbar = () => {
  const [user, setUser] = useAuth((state: any) => [state.user, state.setUser]);
  const router = useRouter();
  const logout = async () => {
    try {
      let response = await axiosInstance.get("/api/user/logout");
      let responseBody = response.data;
      if (responseBody.success == true) {
        setUser(null);
        router.push("/");
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        let response = await axiosInstance.get("/api/user");
        let responseBody = response.data;
        if (responseBody.success == true) {
          setUser(responseBody.body.user);
        }
      } catch (e) {
        console.log(e);
      }
    };
    fetchUser();
  }, []);
  return (
    <div className="navbar bg-base-100 fixed">
      <div className="flex-1">
        <Link href="/" className="btn btn-ghost text-xl">
          Articles | YK Dromar
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          {user != null ? (
            <>
              <li>{user.name}</li>

              <li>
                <button onClick={logout} className={`btn btn-neutral`}>
                  Logout
                </button>
              </li>
            </>
          ) : (
            <li>
              <Link href="/login">Login</Link>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
