import { NextRequest, NextResponse } from "next/server";
import User from "@/app/models/User";
import dbConnect from "@/app/configs/dbConnect";
import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";
export const POST = async (request: NextRequest) => {
  try {
    await dbConnect();
    const oAuth2Client = new OAuth2Client(
      process.env.GOOGLE_CLIENT_ID!,
      process.env.GOOGLE_SECRET!,
      "http://localhost:3000"
    );
    let requestBody = await request.json();
    let tokenInfo = await oAuth2Client.verifyIdToken({
      idToken: requestBody.credential,
      audience: process.env.GOOGLE_CLIENT_ID!,
    });
    let userInfo = tokenInfo.getPayload();
    let user = await User.findOne({ email: userInfo!.email });
    if (!user) {
      let newUser = await User.create(userInfo);
      if (newUser) {
        let newUserData = {
          _id: newUser._id,
          name: newUser.name,
          email: newUser.email,
          role: newUser.role,
        };
        let token = jwt.sign(newUserData, process.env.JWT_SECRET!, {
          algorithm: "HS256",
          expiresIn: "1d",
        });
        let response = NextResponse.json({
          success: true,
          message: "User signed up successfully",
          body: {
            user: newUserData,
          },
        });
        response.cookies.set("token", token, { httpOnly: true });
        response.cookies.set("role", newUserData.role, { httpOnly: true });
        return response;
      } else {
        return NextResponse.json({
          success: false,
          message: "Failed to signup",
          body: {},
        });
      }
    } else {
      let userData = {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      };
      let token = jwt.sign(userData, process.env.JWT_SECRET!, {
        algorithm: "HS256",
        expiresIn: "1d",
      });
      let response = NextResponse.json({
        success: true,
        message: "User Logged in successfully",
        body: {
          user: userData,
        },
      });
      response.cookies.set("token", token, { httpOnly: true });
      response.cookies.set("role", userData.role, { httpOnly: true });
      return response;
    }
  } catch (e) {
    console.log(e);
    return NextResponse.json({
      success: false,
      message: "Something went wrong!",
      body: {},
    });
  }
};
