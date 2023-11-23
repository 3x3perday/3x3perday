import { NextRequest, NextResponse } from "next/server";
import { TodoService } from "@/utils/database/models/todo.service";

export async function GET(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get("userId") || "";
  const date = req.nextUrl.searchParams.get("date") || "";

  return TodoService.getTodo(userId, date);
}

// 오늘 날짜 데이터 만들기
export async function POST(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get("userId") || "";
  const date = req.nextUrl.searchParams.get("date") || "";
  const todo = await TodoService.checkTodo(userId, date);

  if (todo) {
    return new NextResponse(
      JSON.stringify({ message: "이미 생성된 TODO가 있습니다." }),
      { status: 400 }
    );
  }

  return TodoService.postTodo(userId, date);
}

export async function PUT(req: NextRequest) {
  const data = await req.json();
  const todo = data.data;

  return TodoService.updateTodo(todo);
}

export async function PATCH(req: NextRequest) {
  // sortedId 번째 TodoItem 수정
  const data = await req.json();
  const { originTodoResponse, sortedId, newTodo } = data;

  originTodoResponse.todos[Number(sortedId)] = newTodo;

  return TodoService.updateTodo(originTodoResponse);
}
