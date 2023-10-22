import { TodoPage, TodoPageModel } from "@/types/todo";

export const todo = {
  getTodosWithNew: (todos: TodoPageModel[], date: string) => {
    const todayTodo = todos.find((todo) => todo.date === date);

    if (todayTodo) return todos;

    todos.push(new TodoPage(date));

    return todos;
  },
};
