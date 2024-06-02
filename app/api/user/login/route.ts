export const fetchCache = "force-no-store";
import { NextRequest, NextResponse } from "next/server";
import User from "@/app/models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dbConnect from "@/app/core/configs/dbConnect";
export const POST = async (request: NextRequest) => {
  try {
    await dbConnect();
    let requestBody = await request.json();
    let user = await User.findOne({ email: requestBody.email });
    if (user) {
      let isMatched =
        bcrypt.compareSync(requestBody.password, user.password) || false;
      if (isMatched) {
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
          message: "User logged in successfully",
          body: {
            user: userData,
          },
        });
        response.cookies.set("token", token, { httpOnly: true });
        response.cookies.set("role", userData.role, { httpOnly: true });
        return response;
      } else {
        return NextResponse.json({
          success: false,
          message: "Incorrect email/Password!",
          body: {},
        });
      }
    } else {
      return NextResponse.json({
        success: false,
        message: "Incorrect email/Password!",
        body: {},
      });
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
