import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/utils/database/database";
import Todo from "@/utils/database/models/todo";

export async function GET(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get("userId");
  const date = req.nextUrl.searchParams.get("date");
  try {
    await connectDB();
    const todos = await Todo.findOne({
      userId: userId,
      date: date,
    });
    return new NextResponse(JSON.stringify(todos), { status: 200 });
  } catch (error) {
    console.log(error);
  }
}

// 오늘 날짜 데이터 만들기
export async function POST(req: Request) {
  try {
    const user = await req.json(); // {userId : "1234"}
    await connectDB();
    const data = {
      userId: user.userId,
      date: new Date().toISOString().slice(0, 10),
      todos: [
        {
          sortedId: 0,
          mainTodo: { content: "", done: false },
          subTodos: [],
        },
        {
          sortedId: 1,
          mainTodo: { content: "", done: false },
          subTodos: [],
        },
        {
          sortedId: 2,
          mainTodo: { content: "", done: false },
          subTodos: [],
        },
      ],
    };

    const todo = await Todo.create(data);
    return new NextResponse(
      JSON.stringify({ message: "TODO가 생성되었습니다." }),
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
  }
}

// const movies = await db
// .collection("movies")
// .find({})
// .sort({ metacritic: -1 })
// .limit(10)
// .toArray();
