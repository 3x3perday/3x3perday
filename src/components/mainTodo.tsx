'use client';

import React from 'react';
import {css} from "@emotion/react";
import Image from 'next/image';
import SubTodoHint from "@/components/subTodoHint";

type propsType = {};

export default function MainTodo(props: propsType) {
	return (
		<div css={css`
      width: 100%;
      background-color: var(--can, #676767);
      height: 144px;
      border: 2px solid #A5A5A5;
      padding-top: 21px;
      display: flex;
      position: relative;

		`}>
			<div css={css`
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        padding-bottom: 17px;
        color: white;

			`}>
				<div css={css`
          font-size: 100px;
          font-weight: 900;
          line-height: 78px;
          padding-left: 14px;
          padding-right: 16px;
          color: white;
				`}>
					1.
				</div>
				<div css={css`
          margin-left: auto;
				`}>
					<Image css={css`
            fill: var(--can, #676767);
					`} src="/addSub.svg" alt="addSub" width={24} height={21}/>
				</div>
			</div>
			<SubTodoHint/>
		</div>
	);
}