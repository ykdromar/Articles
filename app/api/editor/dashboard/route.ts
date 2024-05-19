import { NextRequest, NextResponse } from "next/server";
import Article from "@/app/models/Article";
import dbConnect from "@/app/configs/dbConnect";
export const GET = async (request: NextRequest) => {
  try {
    await dbConnect();
    let articles = await Article.find().select("-body");
    if (articles) {
      return NextResponse.json({
        success: true,
        message: "Fetched All the articles",
        body: articles,
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "Failed to fetch the articles",
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
