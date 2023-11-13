import { DEFUALT_TODO } from "@/constants/Todo";
import { TodoItem } from "@/types/todo";

export class TodoPost {
  userId: string;
  date: string;
  todos: TodoItem[];

  constructor(userId: string, date: string) {
    this.userId = userId;
    this.date = date;
    this.todos = DEFUALT_TODO;
  }
}
