'use client';

import {css} from "@emotion/react";
import React, { useState } from "react";
import Navbar from "@/components/navbar";
import MainTodo from "@/components/MainTodo";

export default function Home() {
	const [todo, setTodo] = useState("");
	const [todo2, setTodo2] = useState("");
	return (
		<main css={inner}>
			<Navbar />
			<MainTodo
				value={todo}
				onChange={e => setTodo(e.target.value)}
				onClickToggle={e => console.log(e)}
			/>
			<MainTodo
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
