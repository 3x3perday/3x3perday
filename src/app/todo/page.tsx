'use client';

import {css} from "@emotion/react";
import React, { useState } from "react";
import Navbar from "@/components/navbar";
import { TodoTextInput } from '@/components/Input';

export default function Home() {
	const [todo, setTodo] = useState("");
	const [todo2, setTodo2] = useState("");
	return (
		<main css={inner}>
			<Navbar />
			<TodoTextInput
				value={todo}
				onChange={e => setTodo(e.target.value)}
				onClickToggle={e => console.log(e)}
			/>
			<TodoTextInput
				prefixText={"2."}
				value={todo2}
				onChange={e => setTodo2(e.target.value)}
				onClickToggle={e => console.log(e)}
				visibleToggleBtn
			/>
		</main>
	);
}
const inner = css`
  padding: 48px 32px;
`;
