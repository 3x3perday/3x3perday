'use client';

import {css} from "@emotion/react";
import React, { useState } from "react";
import Navbar from "@/components/navbar";
import { Todo, Todo3x3Model } from '@/components/Item/Todo';

export default function Home() {
	const [todos, setTodos] = useState<Todo3x3Model[]>([
		{
			id: 0,
			mainTodo: "",
			subTodos: []
		},
		{
			id: 1,
			mainTodo: "",
			subTodos: []
		},
		{
			id: 2,
			mainTodo: "",
			subTodos: []
		}
	]);

	const onChangeMainTodo = (e: React.ChangeEvent<HTMLTextAreaElement>, mainTodoId: number) => {
		const receiveTodos:Todo3x3Model[] = [...todos];
		receiveTodos[mainTodoId].mainTodo = e.target.value
		setTodos(receiveTodos);
	}

	const onChangeSubTodo = (e: React.ChangeEvent<HTMLTextAreaElement>, mainTodoId: number, subTodoId: number) => {
		const receiveTodos:Todo3x3Model[] = [...todos];
		receiveTodos[mainTodoId].subTodos.map((todo, i) => i === subTodoId ? e.target.value : todo)
		setTodos(receiveTodos);
	}
	const addSubTodo = (todoId: number) => {
		const receiveTodos:Todo3x3Model[] = [...todos];
        receiveTodos[todoId].subTodos.push("");
        setTodos(receiveTodos);
	}

	return (
		<main css={inner}>
			<Navbar />
			{
				todos.map((todo) => {
					const isVisibleToggleBtn = todo.mainTodo.length > 0;
					return (
						<div key={todo.id}>
							<Todo
								id={todo.id}
								mainTodo={todo.mainTodo}
								subTodos={todo.subTodos}
								visibleToggleBtn={isVisibleToggleBtn}
								onChangeMainTodo={onChangeMainTodo}
								onChangeSubTodo={onChangeSubTodo}
								onClickAddSubTodo={addSubTodo}
							></Todo>
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
