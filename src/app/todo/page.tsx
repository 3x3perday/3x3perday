'use client';

import {css} from "@emotion/react";
import React, { useState } from "react";
import Navbar from "@/components/navbar";
import { Todo, Todo3x3Model } from '@/components/Item/Todo';

interface TodoView extends Todo3x3Model {
    visibleSubTodo: boolean;
}

export default function Home() {
	const [todos, setTodos] = useState<TodoView[]>([
		{
			id: 0,
			mainTodo: "",
			subTodos: [""],
			visibleSubTodo: false,
		},
		{
			id: 1,
			mainTodo: "",
			subTodos: [""],
			visibleSubTodo: false,
		},
		{
			id: 2,
			mainTodo: "",
			subTodos: [""],
			visibleSubTodo: false,
		}
	]);

	const onChangeMainTodo = (e: React.ChangeEvent<HTMLTextAreaElement>, mainTodoId: number) => {
		const receiveTodos:TodoView[] = [...todos];
		receiveTodos[mainTodoId].mainTodo = e.target.value
		setTodos(receiveTodos);
	}

	const onChangeSubTodo = (e: React.ChangeEvent<HTMLTextAreaElement>, mainTodoId: number, subTodoId: number) => {
		const receiveTodos:TodoView[] = [...todos];
		receiveTodos[mainTodoId].subTodos.map((todo, i) => i === subTodoId ? e.target.value : todo)
		setTodos(receiveTodos);
	}
	const addSubTodo = (todoId: number) => {
		const receiveTodos:TodoView[] = [...todos];
        receiveTodos[todoId].subTodos.push("");
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
					const isVisibleToggleBtn = todo.mainTodo.length > 0;
					return (
						<div key={todo.id}>
							<Todo
								id={todo.id}
								mainTodo={todo.mainTodo}
								subTodos={todo.subTodos}
								visibleSubTodo={todo.visibleSubTodo && isVisibleToggleBtn}
								visibleToggleBtn={isVisibleToggleBtn}
								onClickToggle={onClickToggle}
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
