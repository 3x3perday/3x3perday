import { TodoService } from "@/utils/database/models/todo.service";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get("userId") || "";

  const todos = await TodoService.getTodoItems(userId);

  return todos;
}
