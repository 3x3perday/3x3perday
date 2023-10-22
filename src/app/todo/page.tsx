'use client';

import {css} from "@emotion/react";
import React, { ChangeEvent, useState } from "react";
import Navbar from "@/components/navbar";
import { TodoTextInput } from '@/components/Input';

interface Todo3x3Model {
	id: number;
	mainTodo: string;
	subTodos: string[];
}

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


	const onChangeMainTodo = (todoId:number) => (e: ChangeEvent<HTMLTextAreaElement>) => {
		const receiveTodos:Todo3x3Model[] = [...todos];
		receiveTodos[todoId].mainTodo = e.target.value
		setTodos(receiveTodos);
	}
	const onChangeSubTodo = (todoId:number, subTodoId: number) => (e: ChangeEvent<HTMLTextAreaElement>) => {
		const receiveTodos:Todo3x3Model[] = [...todos];
		receiveTodos[todoId].subTodos.map((todo, i) => i === subTodoId ? e.target.value : todo)
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
				todos.map((todo) => (
					<div key={todo.id}>
						<TodoTextInput
							prefixText={`${todo.id + 1}.`}
							value={todo.mainTodo}
							onChange={onChangeMainTodo(todo.id)}
							onClickToggle={e => console.log(e)}
						/>
						{
							todo.subTodos.map((subTodo, i) => (
								<div
									key={i}
									css={css`margin-left: 20px`}
								>
									<TodoTextInput
										prefixText={`${i + 1})`}
										value={subTodo[i]}
										onChange={onChangeSubTodo(todo.id, i)}
										onClickToggle={e => console.log(e)}
									/>
								</div>
							))
						}
						<button
							onClick={() => addSubTodo(todo.id)}
							css={css`
								display: ${todo.subTodos.length === 3 ? 'none' : 'block'};
								margin-left: 20px;
							`}
						>adTodo</button>
					</div>
				))
			}
		</main>
	);
}
const inner = css`
  padding: 48px 32px;
`;
