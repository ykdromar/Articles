import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
export const GET = async (request: NextRequest) => {
  try {
    const token = request.cookies.get("token");
    if (token) {
      const decodedToken = jwt.verify(token.value, process.env.JWT_SECRET!);
      return NextResponse.json({
        success: true,
        message: "User found successfully",
        body: {
          user: decodedToken,
        },
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "Unauthorized",
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
