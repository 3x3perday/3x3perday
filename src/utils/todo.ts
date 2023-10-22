import { TodoPage, TodoPageModel } from "@/types/todo";
import dayjs from "dayjs";

const todo = {
  addTodayTodo: (todos: TodoPageModel[]) => {
    const today = dayjs().format("YYYY-MM-DD");

    const todayTodo = todos.find((todo) => todo.date === today);

    if (todayTodo) return todos;

    todos.push(new TodoPage(today));

    return todos;
  },
};
