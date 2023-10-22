"use client";

import React, { useEffect, useState } from "react";
import {
  mockTodoData,
  mocktodos,
  Todo3x3Model,
  TodoPageModel,
} from "@/types/todo";
import { Date } from "@/utils/date";
import { todo } from "@/utils/todo";
import Navbar from "@/components/navbar/navbar";
import { css } from "@emotion/react";
import { TodoItem } from "@/components/Item/TodoItem";
import { TodoTextInput } from "@/components/Input";
import { Icon } from "@/components/Icon/Icon";
import { TODO_COLOR } from "@/constants/Theme";
import Todolist from "./Todolist";

interface TodoView extends Todo3x3Model {
  visibleSubTodo: boolean;
}

const convertTodoView = (todos: Todo3x3Model[]): TodoView[] => {
  return todos.map((todo) => ({
    ...todo,
    visibleSubTodo: false,
  }));
};

export default function Home() {
  const [entireTodos, setEntireTodos] = useState<TodoPageModel[]>(mockTodoData); // 전체 데이터
  const [todoPage, setTodoPage] = useState<TodoPageModel>(mocktodos); // 오늘의 데이터

  const [date, setDate] = useState(Date.getToday()); // 날짜
  const [todos, setTodos] = useState<TodoView[]>(
    convertTodoView(mocktodos.todos)
  );

  const onClickTodo = (todoId: number) => () => {
    console.log(todoId);
  };

  const onClickToggle = (mainTodoId: number, state: boolean) => {
    setTodos((prevState) =>
      prevState.map((itemm) => {
        if (itemm.id === mainTodoId) {
          itemm.visibleSubTodo = state;
        }
        return itemm;
      })
    );
  };

  useEffect(() => {
    // 찾는 날짜가 전체 데이터에 있는지 확인
    const _todos = entireTodos.find((entireTodo) => entireTodo.date === date);
    if (_todos) return setTodoPage(_todos);

    // 찾는 날짜가 전체 데이터에 없으면 새로운 데이터를 만들어서 전체 데이터에 추가
    const newEntireTodos = todo.getTodosWithNew(entireTodos, date);
    setEntireTodos(newEntireTodos);

    // 전체 데이터에서 찾은 날짜의 데이터를 todoPage 에 넣어준다.
    const _newTodos = newEntireTodos.find(
      (entireTodo) => entireTodo.date === date
    );

    if (_newTodos) setTodoPage(_newTodos);
  }, [date, entireTodos]);

  return (
    <main
      css={css`
        background-color: #292929;
      `}
    >
      <Navbar date={date} setDate={setDate} />
      <Todolist todos={todos} setTodos={setTodos} />
    </main>
  );
}
const inner = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px 20px;
`;

const todoCSS = (index: number) => css`
  background-color: ${TODO_COLOR[index]};
  margin-bottom: 32px;
  width: 344px;
  min-height: 169px;
`;
