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
  date: Date;
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
  date: Date;
  todos: Todo3x3Model[];
  constructor(date: Date) {
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

export const mockTodoData = [
  {
    date: "2021-01-01",
    todos: [
      {
        id: 1,
        mainTodo: "todo1",
        subTodos: ["subtodo1", "subtodo2", "subtodo3"],
      },
      {
        id: 2,
        mainTodo: "todo2",
        subTodos: ["subtodo1", "subtodo2", "subtodo3"],
      },
      {
        id: 3,
        mainTodo: "todo3",
        subTodos: ["subtodo1", "subtodo2", "subtodo3"],
      },
    ],
  },
  {
    date: "2023-10-21",
    todos: [
      {
        id: 1,
        mainTodo: "todo10",
        subTodos: ["subtodo10", "subtodo20", "subtodo30"],
      },
      {
        id: 2,
        mainTodo: "todo2",
        subTodos: ["subtodo1", "subtodo2"],
      },
      {
        id: 3,
        mainTodo: "todo3",
        subTodos: ["subtodo1"],
      },
    ],
  },
  {
    date: "2023-10-22",
    todos: [
      {
        id: 1,
        mainTodo: "todo10",
        subTodos: ["subtodo10", "subtodo20", "subtodo30"],
      },
      {
        id: 2,
        mainTodo: "todo2",
        subTodos: ["subtodo1", "subtodo2"],
      },
      {
        id: 3,
        mainTodo: "todo3",
        subTodos: ["subtodo1"],
      },
    ],
  },
];
