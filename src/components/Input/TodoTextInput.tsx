'use client';

import React, { DOMAttributes, InputHTMLAttributes } from 'react';
import { css } from "@emotion/react";
import { TodoTextArea } from '@/components/Input/TodoTextArea';
import { Icon } from '@/components/Icon/Icon';
import FingerButton from '@/components/Button/FingerButton';
import { Button } from '@/components/Button/Button';

export interface TodoTextInputProps {
    isMainTodo?: boolean;
    value?: string;
    onChange?: InputHTMLAttributes<HTMLTextAreaElement>['onChange'];
    onClickToggle?: DOMAttributes<HTMLButtonElement>['onChange'];
    prefixTodoNumber?: 1 | 2 | 3;
    visibleToggleBtn?: boolean;
    editable?: boolean;
    checked?: boolean;
    onClickCheck?: () => void;
}

/**
 * TodoTextInput Component 입니다.
 * @param value Todo 입력 값
 * @param onChange Todo 변경 이벤트
 * @param onClickToggle 토글 버튼 클릭 이벤트
 * @param prefixTodoNumber
 * @param visibleToggleBtn 토글 버튼을 보이거나 숨깁니다.
 */

export const TodoTextInput = (
    {
        isMainTodo = true,
        value,
        onClickToggle,
        onChange,
        prefixTodoNumber = 1,
        visibleToggleBtn = false,
        editable = true,
        checked = false,
        onClickCheck
    }: TodoTextInputProps) => {
    return (
        <div css={todoContainerCSS}>
            <div>
                {
                    isMainTodo ? (
                        <div css={mainTodoIconWrapper}>
                            {
                                !checked ? (
                                    <FingerButton
                                        onClick={onClickCheck}
                                        fingerCount={prefixTodoNumber}
                                        isActive={visibleToggleBtn ?? false}
                                    />
                                ) : (
                                    <Button
                                        onClick={onClickCheck}
                                        css={css`position: absolute; left: -52px;`}
                                    >
                                        <Icon
                                            name={'thumbs-up'}
                                            width={'152px'}
                                            height={'144px'}
                                        />
                                    </Button>
                                )
                            }
                        </div>
                    ) : (
                        <p css={prefixFontStyle}>
                            {prefixTodoNumber}
                        </p>
                    )
                }
            </div>
            <div>
                <TodoTextArea
                    readOnly={!editable}
                    value={value}
                    onChange={onChange}
                    css={todoTextAreaCSS}
                />
                {visibleToggleBtn && <button onClick={onClickToggle} css={toggleButtonCSS} />}
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
const mainTodoIconWrapper = css`
  width: 93px;
  display: flex;
  align-items: center;
  height: 100%;
`;
const toggleButtonCSS = css`
  width: 20px;
  height: 20px;
`;
const todoTextAreaCSS = css`color: #FFF;`;
