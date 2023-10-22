'use client';

import {css} from "@emotion/react";
import React, { ChangeEvent, useState } from "react";
import Navbar from "@/components/navbar";
import { TodoTextInput } from '@/components/Input';

interface Todo3x3Model {
	mainTodo: string;
	subTodos: string[];
}

export default function Home() {
	const [todos, setTodos] = useState<Todo3x3Model>({
		mainTodo: "",
		subTodos: []
	});
	const onChangeMainTodo = (e: ChangeEvent<HTMLTextAreaElement>) => {
		setTodos(prevTodo => ({
			...prevTodo,
			mainTodo: e.target.value
		}))
	}
	const onChangeSubTodo = (num: number) => (e: ChangeEvent<HTMLTextAreaElement>) => {
		setTodos(prevTodo => ({
			...prevTodo,
			subTodos: prevTodo.subTodos.map((todo, i) => i === num ? e.target.value : todo)
		}))
	}
	return (
		<main css={inner}>
			<Navbar />
			<TodoTextInput
				value={todos.mainTodo}
				onChange={onChangeMainTodo}
				onClickToggle={e => console.log(e)}
			/>
			{
				todos.subTodos.map((todo, i) => (
					<TodoTextInput
						prefixText={`${i + 1}.`}
						value={todos.subTodos[i]}
						onChange={onChangeSubTodo(i)}
						onClickToggle={e => console.log(e)}
					/>
				))
			}
		</main>
	);
}
const inner = css`
  padding: 48px 32px;
`;
