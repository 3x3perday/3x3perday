'use client';

import { MainTodo, MainTodoProps } from '@/components/Input';
import { css } from '@emotion/react';
import React from 'react';
import { Todo3x3Model } from '@/types/todo';
import { SubTodo } from '@/components/Todo/SubTodo';

export interface TodoProps extends Todo3x3Model {
    visibleToggleBtn?: MainTodoProps['visibleToggleBtn'];
    onChangeMainTodo?: (e: React.ChangeEvent<HTMLTextAreaElement>, mainTodoId: number) => void;
    onChangeSubTodo?: (e: React.ChangeEvent<HTMLTextAreaElement>, mainTodoId: number, subTodoId: number) => void;
    subTodoMaxLength?: number;
    onClickAddSubTodo?: (id: number) => void;
    onClickToggle?: (mainTodoId: number, visibleSubTodoState: boolean) => void;
    visibleSubTodo?: boolean;
    activeFingerBtn?: boolean;
    editable?: boolean;
}

/**
 * Todo Component 입니다.
 * @param id
 * @param mainTodo
 * @param subTodos
 * @param subTodoMaxLength 서브 투두 최대 개수 default:3
 * @param visibleToggleBtn 투두 토글 버튼 노출 여부 default:false
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
        activeFingerBtn = false,
        visibleToggleBtn = false,

        onChangeMainTodo,
        onChangeSubTodo,
        onClickAddSubTodo,
        onClickToggle,

        visibleSubTodo = false,
        editable = false,
    }: TodoProps) => {
    return (
        <div>
            {/*<MainTodo*/}
            {/*    prefixText={`${id}.`}*/}
            {/*    value={mainTodo.content}*/}
            {/*    onChange={e => onChangeMainTodo && onChangeMainTodo(e, id)}*/}
            {/*    visibleToggleBtn={visibleToggleBtn}*/}
            {/*    activeToggleBtn={visibleSubTodo}*/}
            {/*    activeFingerBtn={activeFingerBtn}*/}
            {/*    onClickToggle={() => onClickToggle && onClickToggle(id, !visibleSubTodo)}*/}
            {/*    editable={editable}*/}
            {/*/>*/}
            {/*{*/}
            {/*    visibleSubTodo && subTodos.map((subTodo, subTodoId) => (*/}
            {/*        <div*/}
            {/*            key={subTodoId}*/}
            {/*            css={css`margin-left: 20px`}*/}
            {/*        >*/}
            {/*            <SubTodo*/}
            {/*                prefixText={subTodoId}*/}
            {/*                value={subTodo.content}*/}
            {/*                onChange={e => onChangeSubTodo && onChangeSubTodo(e, id, subTodoId)}*/}
            {/*                editable={editable}*/}
            {/*            />*/}
            {/*        </div>*/}
            {/*    ))*/}
            {/*}*/}
            {/*{*/}
            {/*    editable && visibleSubTodo && (*/}
            {/*        <button*/}
            {/*            onClick={() => onClickAddSubTodo && onClickAddSubTodo(id)}*/}
            {/*            css={addButtonCSS(subTodos.length, subTodoMaxLength)}*/}
            {/*        >+*/}
            {/*        </button>*/}
            {/*    )*/}
            {/*}*/}
        </div>
    )
}

const addButtonCSS = (todoLength: number, maxLength?: number) => css`
  display: ${todoLength === maxLength ? 'none' : 'block'};
  width: 30px;
  height: 30px;
  margin-left: 20px;
`;
