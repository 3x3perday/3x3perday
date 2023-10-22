export interface Todo3x3Model {
  id: number;
  mainTodo: string;
  subTodos: string[];
}

export interface TodoModel {
  date: Date;
  todos: Todo3x3Model[];
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
