import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/app/configs/dbConnect";
import Like from "@/app/models/Like";
import Article from "@/app/models/Article";
import jwt, { JwtPayload } from "jsonwebtoken";
export const POST = async (request: NextRequest) => {
  try {
    await dbConnect();
    let requestBody = await request.json();
    const token = request.cookies.get("token");
    if (token) {
      const user = jwt.verify(
        token.value,
        process.env.JWT_SECRET!
      ) as JwtPayload;
      let like = await Like.findOne({
        user: user._id,
        article: requestBody.article,
      });
      let articleLiked = await Article.findById(requestBody.article);
      if (like) {
        articleLiked.likes.pull(like._id);
        articleLiked.save();
        await Like.findByIdAndDelete(like._id);
        return NextResponse.json({
          success: true,
          message: "Unliked the article",
          body: like,
        });
      } else {
        let newLike = await Like.create({ ...requestBody, user: user._id });
        articleLiked.likes.push(newLike._id);
        articleLiked.save();
        return NextResponse.json({
          success: true,
          message: "Liked the article",
          body: newLike,
        });
      }
    } else {
      return NextResponse.json({
        success: false,
        message: "Unauthorized!",
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

export const GET = async (request: NextRequest) => {
  try {
    await dbConnect();
    const token = request.cookies.get("token");
    if (token) {
      const user = jwt.verify(
        token.value,
        process.env.JWT_SECRET!
      ) as JwtPayload;
      const likes = await Like.find({ user: user._id });
      const likedArticleIds = likes.map((like) => like.article);
      return NextResponse.json({
        success: true,
        message: "All articles like by user",
        body: likedArticleIds,
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "Unauthorized!",
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
