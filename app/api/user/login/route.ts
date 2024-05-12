import { NextRequest, NextResponse } from "next/server";
import User from "@/app/models/User";
import dbConnect from "@/app/configs/dbConnect";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import fs from "fs";
export const POST = async (request: NextRequest) => {
  try {
    await dbConnect();
    let requestBody = await request.json();
    let user = await User.findOne({ email: requestBody.email });
    if (user) {
      let isMatched =
        bcrypt.compareSync(requestBody.password, user.password) || false;
      if (isMatched) {
        var privateKey = fs.readFileSync("private.key");
        let userData = {
          _id: user._id,
          name: user.name,
          email: user.email,
        };
        let token = jwt.sign(userData, privateKey, {
          algorithm: "RS256",
          expiresIn: 3600000,
        });
        let response = NextResponse.json({
          success: true,
          message: "User logged in successfully",
          body: {
            user: userData,
          },
        });
        response.cookies.set("token", token, { httpOnly: true });
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
