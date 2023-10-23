'use client';

import React, { useEffect, useState } from "react";
import { initializeTodoData, mockTodoData, mocktodos, Todo, Todo3x3Model, TodoPageModel } from '@/types/todo';
import { Date } from '@/utils/date';
import { todo } from '@/utils/todo';
import { css } from '@emotion/react';
import { TodoItem } from '@/components/Item/TodoItem';
import Image from 'next/image';
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';

interface TodoView extends Todo3x3Model {
    visibleSubTodo: boolean;
}

const convertTodoView = (todos: Todo3x3Model[]): TodoView[] => {
    return todos.map(todo => ({
        ...todo,
        visibleSubTodo: false
    }))
}

export default function Home() {
    const router = useRouter()

    const [entireTodos, setEntireTodos] = useState<TodoPageModel[]>(mockTodoData); // 전체 데이터
    const [todoPage, setTodoPage] = useState<TodoPageModel>(mocktodos); // 오늘의 데이터

    const [date, setDate] = useState(Date.getToday()); // 날짜
    const [todos, setTodos] = useState<TodoView[]>(convertTodoView(initializeTodoData.todos));

    const onChangeMainTodo = (e: React.ChangeEvent<HTMLTextAreaElement>, mainTodoId: number) => {
        const receiveTodos:TodoView[] = [...todos];
        receiveTodos[mainTodoId].mainTodo.content = e.target.value
        setTodos(receiveTodos);
    }

    const onChangeSubTodo = (e: React.ChangeEvent<HTMLTextAreaElement>, mainTodoId: number, subTodoId: number) => {
        const receiveTodos:TodoView[] = [...todos];
        receiveTodos[mainTodoId].subTodos = receiveTodos[mainTodoId].subTodos.map((todo, i) => {
            if(i === subTodoId) {
                return {
                    ...todo,
                    content: e.target.value,
                }
            }
            return todo;
        })
        setTodos(receiveTodos);
    }

    const onClickToggle = (mainTodoId: number, state: boolean) => {
        setTodos(prevState => prevState.map(item => {
            if (item.id === mainTodoId) {
                item.visibleSubTodo = state;
            }
            return item;
        }))
    }

    const onClickAdd = (todoId: number) => {
        const receiveTodos:TodoView[] = [...todos];
        receiveTodos[todoId].subTodos = receiveTodos[todoId].subTodos.concat([new Todo()]);
        setTodos(receiveTodos);
    }

    const save = () => {
        console.log(todos)
    }

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
        <main css={css`background-color: #292929; padding-top: 63px;`}>
            <div
                css={naviContainer}
            >
                <Image
                    src="/icon/arrow_left.png"
                    width={15}
                    height={20}
                    alt="arrow"
                    css={naviLeft}
                    onClick={() => router.back()}
                />
                <div css={naviDate}>{dayjs().format('YYYY-MM-DD')}</div>
                <p css={naviRight} onClick={save}>
                    완료
                </p>
            </div>
            <div css={inner}>
                {todos.map((todo, index) => (
                    <div
                        key={todo.id}
                        css={css`
                          margin-bottom: 32px;
                          width: 344px;
                        `}
                    >
                        <TodoItem
                            id={todo.id}
                            mainTodo={todo.mainTodo}
                            subTodos={todo.subTodos}
                            onChangeMainTodo={onChangeMainTodo}
                            onChangeSubTodo={onChangeSubTodo}
                            visibleSubTodo={todo.visibleSubTodo}
                            onClickToggle={onClickToggle}
                            onClickAddSubTodo={onClickAdd}
                            editable={true}
                        />
                    </div>

                ))}
            </div>
        </main>
    );
}
const inner = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px 20px;
`;
const naviContainer = css`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;
const naviDate = css`
  border-bottom-color: #aaaaaa;
  border-bottom: solid 3px;
  font-size: 22px;
  font-weight: 800;
  color: #fff;
  width: 170px;
  height: 33px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const naviLeft = css`
  cursor: pointer;
  position: absolute;
  left: 20px;
`;
const naviRight = css`
  cursor: pointer;
  position: absolute;
  right: 20px;
  color: #fff;
`;
