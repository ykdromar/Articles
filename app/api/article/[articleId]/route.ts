import { NextRequest, NextResponse } from "next/server";
import Article from "@/app/models/Article";
import dbConnect from "@/app/core/configs/dbConnect";
export const GET = async (
  request: NextRequest,
  { params }: { params: { articleId: string } }
) => {
  try {
    await dbConnect();
    let { articleId } = params;

    let article = await Article.findOne({
      articleId: articleId,
      isPublished: true,
    });
    if (article) {
      return NextResponse.json({
        success: true,
        message: "Fetched the article",
        body: article,
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "Failed to fetch the article",
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
export const fetchCache = "force-no-store";
