'use client';

import {css} from "@emotion/react";
import React, { useState } from "react";
import Navbar from "@/components/navbar";
import { TodoItem } from '@/components/Item/TodoItem';
import { Todo, Todo3x3Model } from '@/types/todo';

interface TodoView extends Todo3x3Model {
    visibleSubTodo: boolean;
}

export default function Home() {
	const [todos, setTodos] = useState<TodoView[]>([
		{
			id: 0,
			mainTodo: new Todo(),
			subTodos: [new Todo()],
			visibleSubTodo: false,
		},
		{
			id: 1,
			mainTodo: new Todo(),
			subTodos: [new Todo()],
			visibleSubTodo: false,
		},
		{
			id: 2,
			mainTodo: new Todo(),
			subTodos: [new Todo()],
			visibleSubTodo: false,
		}
	]);

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
	const addSubTodo = (todoId: number) => {
		const receiveTodos:TodoView[] = [...todos];
        receiveTodos[todoId].subTodos = receiveTodos[todoId].subTodos.concat([new Todo()]);
        setTodos(receiveTodos);
	}
	const onClickToggle = (mainTodoId: number, state: boolean) => {
		setTodos(prevState => prevState.map(itemm => {
            if (itemm.id === mainTodoId) {
                itemm.visibleSubTodo = state;
            }
            return itemm;
		}))
	}

	return (
		<main css={inner}>
			<Navbar />
			{
				todos.map((todo) => {
					const isVisibleToggleBtn = todo.mainTodo.content.length > 0;
					return (
						<div key={todo.id}>
							<TodoItem
								id={todo.id}
								mainTodo={todo.mainTodo}
								subTodos={todo.subTodos}
								visibleSubTodo={todo.visibleSubTodo && isVisibleToggleBtn}
								visibleToggleBtn={isVisibleToggleBtn}
								onClickToggle={onClickToggle}
								onChangeMainTodo={onChangeMainTodo}
								onChangeSubTodo={onChangeSubTodo}
								onClickAddSubTodo={addSubTodo}
								editable={false}
							></TodoItem>
						</div>
					);
				})
			}
		</main>
	);
}
const inner = css`
  padding: 48px 32px;
`;
