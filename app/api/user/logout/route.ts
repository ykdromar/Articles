import { NextRequest, NextResponse } from "next/server";
export const GET = async () => {
  try {
    let response = NextResponse.json({
      success: true,
      message: "User logged out successfully",
      body: {},
    });
    response.cookies.set("token", "", { httpOnly: true });
    return response;
  } catch (e) {
    console.log(e);
    return NextResponse.json({
      success: false,
      message: "Something went wrong!",
      body: {},
    });
  }
};
