import { NextResponse } from "next/server";
import connectDB from "../database";
import TodoModel from "./todo";
import { TodoPost } from "@/utils/todo";
import { TodoBase, TodoItem, TodoResponse } from "@/types/todo";

export const TodoService = {
  getTodo: async (userId: string, date: string) => {
    try {
      await connectDB();
      const todos = await TodoModel.findOne({
        userId: userId,
        date: date,
      });
      if (!todos) {
        return new NextResponse(
          JSON.stringify({ message: "TODO가 없습니다." }),
          { status: 400 }
        );
      }
      return new NextResponse(JSON.stringify(todos), { status: 200 });
    } catch (error) {
      console.log(error);
    }
  },

  postTodo: async (userId: string, date: string) => {
    try {
      await connectDB();
      const data = new TodoPost(userId, date);

      const todo = await TodoModel.create(data);

      return new NextResponse(
        JSON.stringify({ message: `${date} 일자의 TODO가 생성되었습니다.` }),
        { status: 200 }
      );
    } catch (error) {
      return new NextResponse(
        JSON.stringify({ message: "TODO 생성에 실패했습니다." }),
        { status: 400 }
      );
    }
  },

  checkTodo: async (userId: string, date: string) => {
    try {
      await connectDB();
      const todos = await TodoModel.findOne({
        userId: userId,
        date: date,
      });
      if (todos) {
        return await JSON.stringify(todos);
      } else {
        return null;
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  },

  updateTodo: async (todo: TodoResponse) => {
    try {
      await connectDB();
      const todoD = await TodoModel.updateOne(
        { userId: todo.userId, date: todo.date },
        todo
      );
      return new NextResponse(
        JSON.stringify({ message: "TODO가 수정되었습니다." }),
        { status: 200 }
      );
    } catch (error) {
      console.log(error);
    }
  },

  getTodoItems: async (userId: string) => {
    try {
      await connectDB();
      const todoItems: TodoResponse[] = await TodoModel.find({
        userId: userId,
      });

      if (!todoItems) {
        return new NextResponse(
          JSON.stringify({ message: "TODO가 없습니다." }),
          { status: 400 }
        );
      }
      let totaldays = todoItems.length;

      let totalMainTodo = 0;
      let doneMainTodo = 0;

      let totalSubTodo = 0;
      let doneSubTodo = 0;

      todoItems.forEach((todoItem) => {
        todoItem.todos.forEach((todo: TodoItem) => {
          totalMainTodo++;
          if (todo.mainTodo.done) doneMainTodo++;

          todo.subTodos.forEach((subTodo: TodoBase) => {
            totalSubTodo++;
            if (subTodo.done) doneSubTodo++;
          });
        });
      });
      return new NextResponse(
        JSON.stringify({
          totaldays,
          totalMainTodo,
          doneMainTodo,
          totalSubTodo,
          doneSubTodo,
        }),
        {
          status: 200,
        }
      );
    } catch (error) {
      console.log(error);
    }
  },
};
