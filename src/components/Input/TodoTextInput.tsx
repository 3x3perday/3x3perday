'use client';

import React, { DOMAttributes, InputHTMLAttributes } from 'react';
import { css } from "@emotion/react";
import { TodoTextArea } from '@/components/Input/TodoTextArea';

export interface TodoTextInputProps {
    value?: string;
    onChange?: InputHTMLAttributes<HTMLTextAreaElement>['onChange'];
    onClickToggle?: DOMAttributes<HTMLButtonElement>['onChange'];
    prefixText?: string;
    visibleToggleBtn?: boolean;
    editable?: boolean;
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
        editable = true
    }: TodoTextInputProps) => {
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
                    readOnly={!editable}
                    value={value}
                    onChange={onChange}
                    css={todoTextAreaCSS}
                />
            </div>
            {
                !editable && <div css={plusIconCSS}></div>
            }
            <div></div>
        </div>
    );
}
const prefixFontStyle = css`
  font-size: 6.25rem;;
  font-weight: 900;
  color: white;
`;
const todoContainerCSS = css`
  position: relative;
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
const plusIconCSS = css`
    ::after {
      content: "";
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='46' height='42' viewBox='0 0 46 42' fill='none'%3E%3Cpath d='M15.361 42V27.6667H0V14.3333H15.361V0H30.639V14.3333H46V27.6667H30.639V42H15.361Z' fill='%23292929'/%3E%3C/svg%3E");
      background-repeat: no-repeat;
      width: 2.875rem;
      height: 2.625rem;
      font-size: 4rem;
      color: #FFF;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
`;
