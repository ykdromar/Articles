export const fetchCache = "force-no-store";

import { NextRequest, NextResponse } from "next/server";
import Article from "@/app/models/Article";
import dbConnect from "@/app/core/configs/dbConnect";

export const revalidate = 0;
export const GET = async (request: Request) => {
  try {
    await dbConnect();
    let articles = await Article.find({ isPublished: true }).select(
      "_id articleId title subtitle likes headerImg publishDate"
    );
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
