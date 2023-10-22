'use client';

import { TodoTextInput, TodoTextInputProps } from '@/components/Input';
import { css } from '@emotion/react';
import React, { useState } from 'react';

export interface Todo3x3Model {
    id: number;
    mainTodo: string;
    subTodos: string[];
}

export interface TodoProps extends Todo3x3Model {
    visibleToggleBtn?: TodoTextInputProps['visibleToggleBtn'];
    onChangeMainTodo: (e: React.ChangeEvent<HTMLTextAreaElement>, mainTodoId: number) => void;
    onChangeSubTodo: (e: React.ChangeEvent<HTMLTextAreaElement>, mainTodoId: number, subTodoId: number) => void;
    subTodoMaxLength?: number;
    onClickAddSubTodo?: (id: number) => void;
}

export const Todo = (
    {
        id,
        mainTodo,
        subTodos,
        subTodoMaxLength = 3,
        visibleToggleBtn = false,
        onChangeMainTodo,
        onChangeSubTodo,
        onClickAddSubTodo,
    }: TodoProps) => {
    const [isVisibleSubTodo, setIsVisibleSubTodo] = useState(false);
    return (
        <div>
            <TodoTextInput
                prefixText={`${id + 1}.`}
                value={mainTodo}
                onChange={e => onChangeMainTodo(e, id)}
                visibleToggleBtn={visibleToggleBtn}
                onClickToggle={() => setIsVisibleSubTodo(state => !state)}
            />
            {
                isVisibleSubTodo && subTodos.map((subTodo, subTodoId) => (
                    <div
                        key={subTodoId}
                        css={css`margin-left: 20px`}
                    >
                        <TodoTextInput
                            prefixText={`${subTodoId + 1})`}
                            value={subTodo[subTodoId]}
                            onChange={e => onChangeSubTodo && onChangeSubTodo(e, id, subTodoId)}
                            onClickToggle={e => console.log(e)}
                        />
                    </div>
                ))
            }
            <button
                onClick={() => onClickAddSubTodo && onClickAddSubTodo(id)}
                css={addButtonCSS(subTodos.length, subTodoMaxLength)}
            >+
            </button>
        </div>
    )
}

const addButtonCSS = (todoLength: number, maxLength: number) => css`
  display: ${todoLength === maxLength ? 'none' : 'block'};
  width: 30px;
  height: 30px;
  margin-left: 20px;
`;
