import { Date } from "./date";

export interface TodoItem {
  // mainTodo 하나 + subTodos 여러개
  sortedId: number;
  mainTodo: {
    content: string;
    done: boolean;
  };
  subTodos: any[];
}

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

const DEFUALT_TODO = [
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
];
