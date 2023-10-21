import React from 'react';
import {css} from "@emotion/react";

type propsType = {};

export default function MainTodo(props: propsType) {
	return (
		<div css={css`
      width: auto;
      background-color: var(--can, #676767);
      height: 144px;
      border: 2px solid #A5A5A5;
		`}>

		</div>
	);
}