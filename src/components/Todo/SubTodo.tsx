'use client';

import React, {InputHTMLAttributes} from 'react';
import {css} from "@emotion/react";
import {TodoTextArea} from '@/components/Input/TodoTextArea';
import NumberButton from '@/components/Button/NumberButton';
import {TODO_COLOR} from '@/constants/Theme';

export interface SubTodoProps {
	mainTodoId: number;
	value?: string;
	onChange?: InputHTMLAttributes<HTMLTextAreaElement>['onChange'];
	prefixTodoNumber?: number;
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
		mainTodoId,
		value,
		onChange,
		prefixTodoNumber = 1,
		editable = true,
		checked = false,
		onClickCheck
	}: SubTodoProps) => {
	return (
		<div css={todoContainerCSS(mainTodoId + 1)}>
			<div>
				<NumberButton
					css={css`
            padding: 4px 0 16px 14px;
					`}
					onClick={onClickCheck}
					count={prefixTodoNumber}
					isActive={checked ?? false}
				/>
			</div>
			<div>
				<TodoTextArea
					readOnly={!editable}
					height={'80px'}
					value={value}
					onChange={onChange}
					css={todoTextAreaCSS}
				/>
			</div>
		</div>
	);
};
const prefixFontStyle = css`
  width: 90px;
  font-family: Pretendard, sans-serif;
  font-size: 6.25rem;;
  font-weight: 900;
  color: white;
`;
const todoContainerCSS = (todoNum: number) => css`
  background: ${TODO_COLOR[todoNum - 1]};
  position: relative;
  display: flex;
  gap: 16px;

`;
const todoTextAreaCSS = css`
  color: #FFF;
  font-size: 15px;
  font-style: normal;
  font-weight: 600;
  line-height: 1.625rem;
`;
