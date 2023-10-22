'use client';

import React, { DOMAttributes } from 'react';
import { css } from "@emotion/react";
import TodoTextArea from '@/components/Input/TodoTextArea';

interface Props {
    onClick?: DOMAttributes<HTMLButtonElement>['onChange'];
    prefixText?: string;
}

export default function MainTodo(
    {
        onClick,
        prefixText = "1."
    }: Props) {
    return (
        <div css={todoContainerCSS}>
            <div css={prefixWrapperCSS}>
                <p css={prefixFontStyle}>
                    {prefixText}
                </p>
                <button onClick={onClick} css={toggleButtonCSS} />
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
  align-items: flex-end;
`;
const toggleButtonCSS = css`width: 20px; height: 20px;`;
