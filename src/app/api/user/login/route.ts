import User from "@/utils/database/models/user";
import connectDB from "@/utils/database/database";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const data = await req.json();
  console.log("🥲", data);

  try {
    const { email, password } = data;

    await connectDB();

    const user = await User.findOne({ email: email, password: password });
    if (!user) {
      return new NextResponse(
        JSON.stringify({
          message: "이메일 또는 비밀번호가 일치하지 않습니다.",
        }),
        { status: 404 }
      );
    }
    return new NextResponse(
      JSON.stringify({
        message: "로그인에 성공하였습니다.",
        userId: user._id,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
  }
}
