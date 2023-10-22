export interface TodoModel {
  done: boolean;
  content: string;
}

export interface Todo3x3Model {
  id: number;
  mainTodo: TodoModel;
  subTodos: TodoModel[];
}

export interface TodoPageModel {
  date: string;
  todos: Todo3x3Model[];
}

// ========================================
export class Todo implements TodoModel {
  done: boolean;
  content: string;
  constructor(content?: string) {
    this.done = false;
    this.content = content || "";
  }
}

export class TodoPage implements TodoPageModel {
  date: string;
  todos: Todo3x3Model[];
  constructor(date: string) {
    this.date = date;
    this.todos = [
      {
        id: 0,
        mainTodo: new Todo(),
        subTodos: [new Todo()],
      },
      {
        id: 1,
        mainTodo: new Todo(),
        subTodos: [new Todo()],
      },
      {
        id: 2,
        mainTodo: new Todo(),
        subTodos: [new Todo()],
      },
    ];
  }
}

export const mocktodos = {
  date: "2021-01-01",
  todos: [
    {
      id: 1,
      mainTodo: new Todo("todo1"),
      subTodos: [new Todo(), new Todo(), new Todo()],
    },
    {
      id: 2,
      mainTodo: new Todo("todo2"),
      subTodos: [new Todo(), new Todo(), new Todo()],
    },
    {
      id: 3,
      mainTodo: new Todo("todo3"),
      subTodos: [new Todo(), new Todo(), new Todo()],
    },
  ],
};

export const mockTodoData = [
  {
    date: "2021-01-01",
    todos: [
      {
        id: 1,
        mainTodo: new Todo("todo1"),
        subTodos: [new Todo(), new Todo(), new Todo()],
      },
      {
        id: 2,
        mainTodo: new Todo(),
        subTodos: [new Todo(), new Todo()],
      },
      {
        id: 3,
        mainTodo: new Todo(),
        subTodos: [new Todo()],
      },
    ],
  },
] as TodoPageModel[];
