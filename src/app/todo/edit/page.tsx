'use client';

import React, { useEffect, useState } from "react";
import { mockTodoData, mocktodos, Todo, Todo3x3Model, TodoPageModel } from '@/types/todo';
import { Date } from '@/utils/date';
import { todo } from '@/utils/todo';
import Navbar from '@/components/navbar/navbar';
import { css } from '@emotion/react';
import { TODO_COLOR } from '@/constants/Theme';
import { TodoItem } from '@/components/Item/TodoItem';
import { MainTodo } from '@/components/Todo/MainTodo';
import { Icon } from '@/components/Icon/Icon';

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
    const [entireTodos, setEntireTodos] = useState<TodoPageModel[]>(mockTodoData); // 전체 데이터
    const [todoPage, setTodoPage] = useState<TodoPageModel>(mocktodos); // 오늘의 데이터

    const [date, setDate] = useState(Date.getToday()); // 날짜
    const [todos, setTodos] = useState<TodoView[]>(convertTodoView(mocktodos.todos));

    const onClickCheckMainTodo = (todoId:  number) => () => {
        setTodos(prevState => prevState.map(item => {
            if (item.id === todoId) {
                item.mainTodo.done = !item.mainTodo.done;
            }
            return item;
        }))
    }
    const onClickCheckSubTodo = (mainTodoId: number, subTodoId: number) => {
        const receiveTodos:TodoView[] = [...todos];
        receiveTodos[mainTodoId].subTodos = receiveTodos[mainTodoId].subTodos.map((todo, i) => {
            if(i === subTodoId) {
                return {
                    ...todo,
                    done: !todo.done,
                }
            }
            return todo;
        });
        setTodos(receiveTodos);
    }

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
        <main css={css`background-color: #292929;`}>
            <Navbar date={date} setDate={setDate} />
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
