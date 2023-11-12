import User from "@/utils/database/models/user";
import connectDB from "@/utils/database/database";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    console.log("🥲", data);
    await connectDB();

    await User.create(data);

    return new NextResponse(
      JSON.stringify({
        message: "회원가입이 완료되었습니다.",
      }),
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
  }
}
