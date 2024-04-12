import { NextRequest, NextResponse } from "next/server";
import Article from "@/app/models/Article";
import dbConnect from "@/app/lib/dbConnect";
export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    let req = await request.json();
    let article = await Article.create(req);
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
}

// export async function GET(request: NextRequest) {
//   return NextResponse.json({
//     message: "H4llo",
//   });
// }
