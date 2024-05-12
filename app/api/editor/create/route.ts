import { NextRequest, NextResponse } from "next/server";
import Article from "@/app/models/Article";
import dbConnect from "@/app/configs/dbConnect";
export const POST = async (request: NextRequest) => {
  try {
    await dbConnect();
    let requestBody = await request.json();
    let article = await Article.create(requestBody);
    if (article) {
      return NextResponse.json({
        success: true,
        message: "Article published successfully",
        body: article,
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "Failed to publish article!",
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
