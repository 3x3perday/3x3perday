'use client';

import {css} from "@emotion/react";
import React from "react";
import Navbar from "@/components/navbar";
import MainTodo from "@/components/mainTodo";

export default function Home() {
	const color = 'white';

	return (
		<main css={css`
      padding: 48px 32px;
		`}>
			<Navbar/>
			<MainTodo/>
		</main>
	);
}
