'use client';

import { MainTodo, MainTodoProps } from '@/components/Input';
import { css } from '@emotion/react';
import React from 'react';
import { Todo3x3Model } from '@/types/todo';
import { SubTodo } from '@/components/Todo/SubTodo';

export interface TodoProps extends Todo3x3Model {
    onChangeMainTodo?: (e: React.ChangeEvent<HTMLTextAreaElement>, mainTodoId: number) => void;
    onChangeSubTodo?: (e: React.ChangeEvent<HTMLTextAreaElement>, mainTodoId: number, subTodoId: number) => void;
    onClickToggle?: (mainTodoId: number, visibleSubTodoState: boolean) => void;
    onClickAddSubTodo?: (id: number) => void;

    onClickCheckMainTodo?: () => void;
    onClickCheckSubTodo?: (mainTodoId: number, subTodoId: number) => void;

    subTodoMaxLength?: number;
    visibleSubTodo?: boolean;
    editable?: boolean;
}

/**
 * Todo Component 입니다.
 * @param id
 * @param mainTodo
 * @param subTodos
 * @param subTodoMaxLength 서브 투두 최대 개수 default:3
 * @param onChangeMainTodo 메인 투두 변경 함수
 * @param onChangeSubTodo 서브 투두 변경 함수
 * @param onClickAddSubTodo 서브 투두 추가 함수
 * @param onClickToggle 투두 토글 함수
 * @param visibleSubTodo 서브 투두 노출 여부 default:false
 */

export const TodoItem = (
    {
        id,
        mainTodo,
        subTodos,
        subTodoMaxLength = 3,

        onChangeMainTodo,
        onChangeSubTodo,
        onClickAddSubTodo,
        onClickToggle,
        onClickCheckMainTodo,
        onClickCheckSubTodo,

        visibleSubTodo = false,
        editable = false,
    }: TodoProps) => {


    const activeFingerBtn = mainTodo.content.length > 0;
    const visibleToggleBtn = activeFingerBtn && subTodos.length > 0;

    return (
        <div css={css`position: relative`}>
            <MainTodo
                prefixText={`${id}.`}
                value={mainTodo.content}
                onChange={e => onChangeMainTodo && onChangeMainTodo(e, id)}
                visibleToggleBtn={visibleToggleBtn}
                activeToggleBtn={visibleSubTodo}
                activeFingerBtn={activeFingerBtn}
                onClickToggle={() => onClickToggle && onClickToggle(id, !visibleSubTodo)}
                editable={editable}
                checked={mainTodo.done}
                onClickCheck={() => onClickCheckMainTodo && onClickCheckMainTodo()}
            />
            {
                visibleSubTodo && subTodos.map((subTodo, subTodoId) => (
                    <div
                        key={subTodoId}
                        css={css`margin-left: 100px;`}
                    >
                        <SubTodo
                            mainTodoId={id + 1}
                            prefixTodoNumber={subTodoId + 1}
                            value={subTodo.content}
                            onChange={e => onChangeSubTodo && onChangeSubTodo(e, id, subTodoId)}
                            editable={editable}
                            checked={subTodo.done}
                            onClickCheck={() => onClickCheckSubTodo && onClickCheckSubTodo(id, subTodoId)}
                        />
                    </div>
                ))
            }
            {
                editable && visibleSubTodo && (
                    <button
                        onClick={() => onClickAddSubTodo && onClickAddSubTodo(id)}
                        css={addButtonCSS(subTodos.length, subTodoMaxLength)}
                    >+
                    </button>
                )
            }
        </div>
    )
}

const addButtonCSS = (todoLength: number, maxLength?: number) => css`
  display: ${todoLength === maxLength ? 'none' : 'block'};
  width: 30px;
  height: 30px;
  margin-left: 100px;
`;
