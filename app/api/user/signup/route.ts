import { NextRequest, NextResponse } from "next/server";
import User from "@/app/models/User";
import dbConnect from "@/app/configs/dbConnect";
export const POST = async (request: NextRequest) => {
  try {
    await dbConnect();
    let requestBody = await request.json();
    let user = await User.findOne({ email: requestBody.email });
    if (!user) {
      let newUser = await User.create(requestBody);
      if (newUser) {
        return NextResponse.json({
          success: true,
          message: "User signed up successfully",
          body: newUser,
        });
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
