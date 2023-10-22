'use client';

import React, { InputHTMLAttributes } from 'react';
import { css } from "@emotion/react";
import { TodoTextArea } from '@/components/Input/TodoTextArea';

export interface SubTodoProps {
    value?: string;
    onChange?: InputHTMLAttributes<HTMLTextAreaElement>['onChange'];
    prefixTodoNumber?: 1 | 2 | 3;
    editable?: boolean;
    checked?: boolean;
    onClickCheck?: () => void;
}

/**
 * TodoTextInput Component 입니다.
 * @param value Todo 입력 값
 * @param onChange Todo 변경 이벤트
 * @param prefixTodoNumber
 */

export const SubTodo = (
    {
        value,
        onChange,
        prefixTodoNumber = 1,
        editable = true,
        checked = false,
        onClickCheck
    }: SubTodoProps) => {
    return (
        <div css={todoContainerCSS}>
            <div>
                <p css={prefixFontStyle}>
                    {prefixTodoNumber}
                </p>
            </div>
            <div>
                <TodoTextArea
                    readOnly={!editable}
                    value={value}
                    onChange={onChange}
                    css={todoTextAreaCSS}
                />
            </div>
        </div>
    );
}
const prefixFontStyle = css`
  width: 90px;
  font-family: Pretendard, sans-serif;
  font-size: 6.25rem;;
  font-weight: 900;
  color: white;
`;
const todoContainerCSS = css`
  position: relative;
  display: flex;
  gap: 16px;
`;
const todoTextAreaCSS = css`color: #FFF;`;
