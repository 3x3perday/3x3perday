"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  initializeTodoData,
  mockTodoData,
  mocktodos,
  Todo3x3Model,
  TodoPage,
  TodoPageModel,
} from "@/types/todo";
import { Date } from "@/utils/date";
import Navbar from "@/components/navbar/navbar";
import { css } from "@emotion/react";
import { TodoItem } from "@/components/Item/TodoItem";
import { MainTodo } from "@/components/Todo/MainTodo";
import { Icon } from "@/components/Icon/Icon";
import {
  DragDropContext,
  Draggable,
  DropResult,
  Droppable,
} from "@hello-pangea/dnd";
import Image from "next/image";
import { useDnD } from "@/utils/dnd";
import styled from "@emotion/styled";
import { usePathname, useRouter } from "next/navigation";
import dayjs from "dayjs";

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
  const router = useRouter();
  // const [entireTodos, setEntireTodos] = useState<TodoPageModel[]>(mockTodoData); // 전체 데이터
  // const [todoPage, setTodoPage] = useState<TodoPageModel>(mocktodos); // 오늘의 데이터

  const [date, setDate] = useState(Date.getToday()); // 날짜
  const [todos, setTodos] = useState<TodoView[]>([]);

  const onClickTodo = (todoId: number) => () => {
    router.push("/todo/edit");
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

  const onClickCheckMainTodo = (todoId: number) => () => {
    setTodos((prevState) =>
      prevState.map((item) => {
        if (item.id === todoId) {
          item.mainTodo.done = !item.mainTodo.done;
        }
        return item;
      })
    );
  };
  const onClickCheckSubTodo = (mainTodoId: number, subTodoId: number) => {
    const receiveTodos: TodoView[] = [...todos];
    receiveTodos[mainTodoId].subTodos = receiveTodos[mainTodoId].subTodos.map(
      (todo, i) => {
        if (i === subTodoId) {
          return {
            ...todo,
            done: !todo.done,
          };
        }
        return todo;
      }
    );
    setTodos(receiveTodos);
  };
  const path = usePathname();
  const today = useRef(dayjs().format("YYYY-MM-DD")).current;
  const [currentDate, setCurrentDate] = useState(dayjs().format("YYYY-MM-DD"));

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(mockTodoData));
  }, []);

  useEffect(() => {
    const getLocalData = localStorage.getItem("todos");
    if (getLocalData) {
      const getLocalTodoPageData: TodoPage[] = JSON.parse(getLocalData);
      const todoData: TodoPage | undefined = getLocalTodoPageData.find(
        (val) => val.date === currentDate
      );
      if (todoData) {
        const getTodosData = todoData.todos as TodoView[];
        setTodos(getTodosData);
      } else {
        setTodos(convertTodoView(initializeTodoData.todos));
      }
    } else {
      localStorage.setItem("todos", JSON.stringify(mockTodoData));
    }
  }, [path]);

  useEffect(() => {
    if (today !== currentDate) {
      setCurrentDate(date);
      const findTodo = mockTodoData.find((val) => val.date === date)?.todos;
      if (findTodo) {
        setTodos(convertTodoView(findTodo));
      }
    }
  }, [date]);

  // useEffect(() => {
  //     localStorage.setItem("todos", JSON.stringify(convertTodoView(mocktodos.todos)));
  //     setTodos(convertTodoView(mocktodos.todos));
  // }, []);

  // useEffect(() => {
  //   // const getLocalTodoData = localStorage.getItem("todos");
  //   // 찾는 날짜가 전체 데이터에 있는지 확인
  //   const _todos = entireTodos.find((entireTodo) => entireTodo.date === date)?.todos;
  //   if (_todos) return setTodos(convertTodoView(_todos));
  //
  //   // 찾는 날짜가 전체 데이터에 없으면 새로운 데이터를 만들어서 전체 데이터에 추가
  //   const newEntireTodos = todo.getTodosWithNew(entireTodos, date);
  //   setEntireTodos(newEntireTodos);
  //
  //   // 전체 데이터에서 찾은 날짜의 데이터를 todoPage 에 넣어준다.
  //   const _newTodos = newEntireTodos.find(
  //     (entireTodo) => entireTodo.date === date
  //   )?.todos;
  //
  //   if (_newTodos) setTodos(convertTodoView(_newTodos));
  // }, [date, entireTodos, path]);

  //================================================================================================
  useDnD();
  const onDragEnd = ({ source, destination }: DropResult) => {
    if (!destination) return;
    const _items = JSON.parse(JSON.stringify(todos)) as typeof todos;

    const [targetItem] = _items.splice(source.index, 1);

    _items.splice(destination.index, 0, targetItem);

    setTodos(_items);
  };

  // useEffect(() => {
  //   if (entireTodos.length === 0) {
  //     const data = localStorage.getItem("todos");
  //
  //     if (data) {
  //       setEntireTodos(JSON.parse(data));
  //     } else setEntireTodos(mockTodoData);
  //
  //     return;
  //   }
  //   localStorage.setItem("todos", JSON.stringify(entireTodos));
  // }, [entireTodos, path]);

  // useEffect(() => {
  //   const newTodos = entireTodos.map((data) => {
  //     if (data.date !== date) return data;
  //
  //     return { ...data, todos };
  //   });
  //   setEntireTodos(newTodos);
  //   console.log("todos", newTodos);
  // }, [todos]);

  // =================================================================================================
  return (
    <main
      css={css`
        background-color: #292929;
      `}
    >
      <Navbar date={date} setDate={setDate} />
      <div css={inner}>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {todos.map((todo, index) => (
                  <Draggable
                    key={todo.id}
                    draggableId={String(todo.id)}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        key={todo.id}
                        css={css`
                          margin-bottom: 32px;
                          width: 344px;
                          position: relative;
                        `}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                      >
                        <DragButton {...provided.dragHandleProps}>
                          <Image
                            src="/icon/drag_icon.png"
                            width={15}
                            height={15}
                            alt="drag"
                          />
                        </DragButton>
                        {todo.mainTodo.content !== "" ? (
                          <TodoItem
                            id={todo.id}
                            mainTodo={todo.mainTodo}
                            subTodos={todo.subTodos}
                            visibleSubTodo={todo.visibleSubTodo}
                            onClickToggle={onClickToggle}
                            onClickCheckMainTodo={onClickCheckMainTodo(todo.id)}
                            onClickCheckSubTodo={onClickCheckSubTodo}
                            editable={false}
                          />
                        ) : (
                          <Icon
                            name={"plus"}
                            width={"344px"}
                            height={"169px"}
                            onClick={onClickTodo(todo.id)}
                          >
                            <MainTodo
                              prefixTodoNumber={todo.id + 1}
                              value={todo.mainTodo.content}
                              editable={false}
                            />
                          </Icon>
                        )}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </main>
  );
}
const inner = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 35px 20px;
`;

const DragButton = styled.div`
  width: 15px;
  height: 15px;
  position: absolute;
  top: 3px;
  right: 3px;
  z-index: 1;
`;
