import { NextRequest, NextResponse } from "next/server";
export async function POST(request: NextRequest) {
  let req = await request.json();
  console.log(req);
  return NextResponse.json(req.body);
}

export async function GET(request: NextRequest) {
  return NextResponse.json({
    message: "H4llo",
  });
}
