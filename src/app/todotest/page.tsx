"use client";
import TodoDeleteModal from "@/components/modal/todo/delete";
import Navbar from "@/components/navbar/navbar";
import { TodoPageModel, mockTodoData, mocktodos } from "@/types/todo";
import { Date } from "@/utils/date";
import { todo } from "@/utils/todo";
import React, { useEffect, useState } from "react";

const TodoTest = () => {
  const [entireTodos, setEntireTodos] = useState<TodoPageModel[]>(mockTodoData); // 전체 데이터
  const [todoPage, setTodoPage] = useState<TodoPageModel>(mocktodos); // 오늘의 데이터

  const [date, setDate] = useState(Date.getToday()); // 날짜
  const [popDelete, setPopDelete] = useState(false); // 삭제 팝업
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
    <main>
      <Navbar date={date} setDate={setDate} />

      {todoPage.todos.map((todo) => {
        return <div key={todo.id}>{todo.mainTodo.content}</div>;
      })}
      {popDelete && (
        <TodoDeleteModal
          submit={() => {}}
          isOpen={popDelete}
          setIsOpen={setPopDelete}
        />
      )}
    </main>
  );
};

export default TodoTest;
