// 헝가리형 = I + 타입명

export interface TodoResponse {
  _id?: string;
  userId: string;
  date: string; // 2021-01-01
  todos: TodoItem[];
}

export interface TodoItem {
  sortedId: number;
  mainTodo: TodoBase;
  subTodos: TodoBase[];
}

export interface TodoBase {
  content: string;
  done: boolean;
}
