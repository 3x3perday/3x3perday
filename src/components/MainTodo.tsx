'use client';

import React, { DOMAttributes } from 'react';
import { css } from "@emotion/react";
import TodoTextArea from '@/components/Input/TodoTextArea';

interface Props {
    onClick?: DOMAttributes<HTMLButtonElement>['onChange'];
}

export default function MainTodo(
    {
        onClick,
    }: Props) {
    return (
        <div css={todoContainerCSS}>
            <div css={prefixWrapperCSS}>
                <p css={prefixFontStyle}>
                    1.
                </p>
                <button onClick={onClick}>
                    toggle
                </button>
            </div>
            <div>
                <TodoTextArea
                    css={css`color: #FFF;`}
                />
            </div>
        </div>
    );
}

const prefixFontStyle = css`
  font-size: 6.25rem;;
  font-weight: 900;
  color: white;
`;
const todoContainerCSS = css`
  display: flex;
  background: #676767;
`;
const prefixWrapperCSS = css`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
