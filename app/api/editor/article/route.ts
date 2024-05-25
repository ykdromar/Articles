import { NextRequest, NextResponse } from "next/server";
import Article from "@/app/models/Article";
import dbConnect from "@/app/configs/dbConnect";
export const POST = async (request: NextRequest) => {
  try {
    await dbConnect();
    let requestBody = await request.json();
    let article = await Article.create(requestBody);
    console.log(requestBody);
    if (article) {
      console.log(article);
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

export const PUT = async (request: NextRequest) => {
  try {
    await dbConnect();
    let requestBody = await request.json();
    let article = await Article.findById(requestBody._id);

    if (article) {
      let newArticle = await Article.findByIdAndUpdate(
        requestBody._id,
        requestBody,
        { new: true }
      );
      console.log(newArticle);
      return NextResponse.json({
        success: true,
        message: "Article updated successfully",
        body: newArticle,
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "Article not found!",
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
