"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useGoogleOneTapLogin } from "@react-oauth/google";
import Auth from "../core/api/authAPI";
import { useRouter } from "next/navigation";
import { useAuth } from "../core/configs/useAuth";
import AuthAPI from "../core/api/authAPI";
const Navbar = () => {
  const [user, loading] = useAuth((state: any) => [state.user, state.loading]);
  const router = useRouter();
  const { googleSignup, logout, getUser } = AuthAPI();

  // One Tap Google Login
  useGoogleOneTapLogin({
    onSuccess: async (credentialResponse) => {
      googleSignup(credentialResponse);
    },
    onError: () => {
      console.log("Login Failed");
    },
  });

  useEffect(() => {
    if (user != null && user != undefined) {
      router.push("/");
    }
  }, [router, user]);

  // Fetching the user on App Load
  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="navbar border-b bg-base-100  z-50 h-10">
      <div className="flex-1">
        <Link href="/" className="btn btn-ghost text-xl">
          Articles
        </Link>
      </div>
      <div className="flex-none">
        {!loading && (
          <ul className="menu menu-horizontal px-1 flex items-center">
            {user != null ? (
              <>
                <li className="font-bold mr-3 max-w-16 overflow-hidden truncate">
                  {user.name.split(" ")[0]}
                </li>
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
        )}
      </div>
    </div>
  );
};

export default Navbar;
