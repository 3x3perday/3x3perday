'use client';

import {css} from "@emotion/react";
import React from "react";
import Navbar from "@/components/navbar";
import MainTodo from "@/components/mainTodo";

export default function Home() {

	return (
		<main css={css`
      padding: 48px 32px;
		`}>
			<div css={css`
        padding-bottom: 26px;
			`}>
				<Navbar/>
			</div>
			<MainTodo/>
		</main>
	);
}
