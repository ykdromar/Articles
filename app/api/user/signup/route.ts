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
    if (!user) {
      let saltRounds = process.env.SALT_ROUNDS!;
      let hashedPassword = bcrypt.hashSync(
        requestBody.password,
        Number(saltRounds)
      );
      let newUser = await User.create({
        ...requestBody,
        password: hashedPassword,
      });
      if (newUser) {
        var privateKey = fs.readFileSync("private.key");

        let newUserData = {
          _id: newUser._id,
          name: newUser.name,
          email: newUser.email,
        };
        let token = jwt.sign(newUserData, privateKey, {
          algorithm: "RS256",
          expiresIn: 3600000,
        });
        let response = NextResponse.json({
          success: true,
          message: "User signed up successfully",
          body: {
            user: newUserData,
          },
        });
        response.cookies.set("token", token, { httpOnly: true });
        return response;
      } else {
        return NextResponse.json({
          success: false,
          message: "Failed to signup",
          body: {},
        });
      }
    } else {
      return NextResponse.json({
        success: false,
        message: "User already exists",
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
