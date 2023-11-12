import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/utils/database/database";
import TodoModel from "@/utils/database/models/todo";
import { TodoPost } from "@/utils/todo";
import { Date } from "@/utils/date";
import { TodoService } from "@/utils/database/models/todo.service";

export async function GET(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get("userId") || "";
  const date = req.nextUrl.searchParams.get("date") || "";
  const todos = await TodoService.getTodo(userId, date);

  return TodoService.getTodo(userId, date);
}

// 오늘 날짜 데이터 만들기
export async function POST(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get("userId") || "";

  const date = "2023-11-15";

  const todo = await TodoService.checkTodo(userId, date);

  if (todo) {
    return new NextResponse(
      JSON.stringify({ message: "이미 생성된 TODO가 있습니다." }),
      { status: 400 }
    );
  }

  return TodoService.postTodo(userId, date);
}
