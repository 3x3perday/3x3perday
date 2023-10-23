'use client';

import React, { useState } from "react";
import { mocktodos, Todo, Todo3x3Model, TodoModel } from '@/types/todo';
import { css } from '@emotion/react';
import { MainTodo } from '@/components/Todo/MainTodo';
import { TODO_COLOR } from '@/constants/Theme';
import { SubTodo } from '@/components/Todo/SubTodo';
import { TodoItem } from '@/components/Item/TodoItem';
import { convertTodoView } from '@/app/todo/page';

interface TodoView extends Todo3x3Model {
    visibleSubTodo: boolean;
}

export default function Home() {
    const [mainTodo, setMainTodo] = useState<TodoModel>({
        content: "",
        done: false,
    });
    const [subTodo, setSubTodo] = useState<TodoModel>({
        content: "",
        done: false,
    });

    const [todos, setTodos] = useState<TodoView[]>(convertTodoView( [
        {
            id: 0,
            mainTodo: new Todo(""),
            subTodos: [new Todo('')],
        },
        {
            id: 1,
            mainTodo: new Todo(""),
            subTodos: [],
        },
        {
            id: 2,
            mainTodo: new Todo(),
            subTodos: [new Todo(), new Todo(), new Todo()],
        },
    ]));

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

    return (
        <main css={css`background-color: #292929;`}>
            <div
                css={css`
                  background-color: ${TODO_COLOR[0]};
                  margin-bottom: 32px;
                  width: 344px;
                `}
            >
                <MainTodo
                    value={mainTodo.content}
                    prefixTodoNumber={1}
                    activeFingerBtn={true}
                    visibleToggleBtn={false}
                    visibleSubTodo={false}
                    editable={true}
                    checked={mainTodo.done}
                    onClickCheck={() => setMainTodo(prevState => ({
                        ...prevState,
                        done: !prevState.done
                    }))}
                    onChange={e => setMainTodo(prevState => ({
                        ...prevState,
                        content: e.target.value,
                    }))}
                ></MainTodo>
            </div>
            <div
                css={css`
                  background-color: ${TODO_COLOR[0]};
                  margin-bottom: 32px;
                  width: 344px;
                `}
            >
                <SubTodo
                    value={subTodo.content}
                    prefixTodoNumber={1}
                    editable={true}
                    checked={subTodo.done}
                    onClickCheck={() => setSubTodo(prevState => ({
                        ...prevState,
                        done: !prevState.done
                    }))}
                    onChange={e => setSubTodo(prevState => ({
                        ...prevState,
                        content: e.target.value,
                    }))}
                ></SubTodo>
            </div>
            <div
                css={css`
                  margin-bottom: 32px;
                  width: 344px;
                `}
            >
                {/*visibleToggleBtn={visibleToggleBtn}*/}
                {/*activeToggleBtn={visibleSubTodo}*/}
                {/*activeFingerBtn={activeFingerBtn}*/}
                {/*onClickToggle={() => onClickToggle && onClickToggle(id, !visibleSubTodo)}*/}
                <TodoItem
                    id={todos[0].id}
                    mainTodo={todos[0].mainTodo}
                    subTodos={todos[0].subTodos}
                    onChangeMainTodo={onChangeMainTodo}
                    onChangeSubTodo={onChangeSubTodo}
                    visibleSubTodo={todos[0].visibleSubTodo}
                    onClickToggle={onClickToggle}
                    onClickAddSubTodo={onClickAdd}
                    editable={true}
                />
            </div>
            <div
                css={css`
                  margin-bottom: 32px;
                  width: 344px;
                `}
            >
                <TodoItem
                    id={todos[0].id}
                    mainTodo={todos[0].mainTodo}
                    subTodos={todos[0].subTodos}
                    onChangeMainTodo={onChangeMainTodo}
                    onChangeSubTodo={onChangeSubTodo}
                    visibleSubTodo={todos[0].visibleSubTodo}
                    onClickToggle={onClickToggle}
                    onClickAddSubTodo={onClickAdd}
                    onClickCheckMainTodo={() => {
                        console.log('checkMain')
                    }}
                    onClickCheckSubTodo={() => {
                        console.log('checkSub')
                    }}
                    editable={false}
                />
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
