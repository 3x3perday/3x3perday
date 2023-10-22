'use client';

import React, { DOMAttributes, InputHTMLAttributes } from 'react';
import { css } from "@emotion/react";
import { TodoTextArea } from '@/components/Input/TodoTextArea';

interface Props {
    value: string;
    onChange: InputHTMLAttributes<HTMLTextAreaElement>['onChange'];
    onClickToggle?: DOMAttributes<HTMLButtonElement>['onChange'];
    prefixText?: string;
    visibleToggleBtn?: boolean;
}

/**
 * TodoTextInput Component 입니다.
 * @param value Todo 입력 값
 * @param onChange Todo 변경 이벤트
 * @param onClickToggle 토글 버튼 클릭 이벤트
 * @param prefixText
 * @param visibleToggleBtn 토글 버튼을 보이거나 숨깁니다.
 */

export const TodoTextInput = (
    {
        value,
        onClickToggle,
        onChange,
        prefixText = "1.",
        visibleToggleBtn = false,
    }: Props) {
    return (
        <div css={todoContainerCSS}>
            <div css={prefixWrapperCSS}>
                <p css={prefixFontStyle}>
                    {prefixText}
                </p>
                {visibleToggleBtn && <button onClick={onClickToggle} css={toggleButtonCSS} />}
            </div>
            <div>
                <TodoTextArea
                    value={value}
                    onChange={onChange}
                    css={todoTextAreaCSS}
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
const toggleButtonCSS = css`
  width: 20px;
  height: 20px;
`;
const todoTextAreaCSS = css`color: #FFF;`;
