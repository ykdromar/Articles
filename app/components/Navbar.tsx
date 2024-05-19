"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useAuth } from "../configs/globalState";
import { useRouter } from "next/navigation";
import { axiosInstance } from "@/app/configs/axiosConfig";
import { useGoogleOneTapLogin } from "@react-oauth/google";
const Navbar = () => {
  const [user, setUser, setLikedArticles] = useAuth((state: any) => [
    state.user,
    state.setUser,
    state.setLikedArticles,
  ]);
  const router = useRouter();
  const logout = async () => {
    try {
      let response = await axiosInstance.get("/api/user/logout");
      let responseBody = response.data;
      if (responseBody.success == true) {
        setUser(null);
        setLikedArticles([]);
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

  const fetchLikedArticles = async () => {
    try {
      let response = await axiosInstance.get("/api/article/like");
      let responseBody = response.data;
      if (responseBody.success == true) {
        setLikedArticles(responseBody.body);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchLikedArticles();
  }, [user]);

  useGoogleOneTapLogin({
    onSuccess: async (credentialResponse) => {
      try {
        let response = await axiosInstance.post(
          "/api/user/googleSignin",
          credentialResponse
        );
        let responseBody = response.data;
        if (responseBody.success == true) {
          setUser(responseBody.body.user);
          router.push("/");
        }
      } catch (e) {
        console.log(e);
      }
    },
    onError: () => {
      console.log("Login Failed");
    },
  });
  return (
    <div className="navbar bg-base-100  z-50 h-20">
      <div className="flex-1">
        <Link href="/" className="btn btn-ghost text-xl">
          Articles | YK Dromar
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1 flex items-center">
          {user != null ? (
            <>
              <li className="font-bold mr-3">{user.name}</li>
              {user.role === "editor" && (
                <li>
                  <Link className="btn mr-2" href="/editor/dashboard">
                    Dashboard
                  </Link>
                </li>
              )}

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
