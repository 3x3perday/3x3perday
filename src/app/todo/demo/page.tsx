'use client';

import React, { useState } from "react";
import { Todo3x3Model, TodoModel } from '@/types/todo';
import { css } from '@emotion/react';
import { MainTodo } from '@/components/Todo/MainTodo';
import { TODO_COLOR } from '@/constants/Theme';
import { SubTodo } from '@/components/Todo/SubTodo';

interface TodoView extends Todo3x3Model {
    visibleSubTodo: boolean;
}

export default function Home() {
    const [mainTodo, setMainTodo] = useState<TodoModel>({
        content: "",
        done: false,
    });
    const [subTodo, setSubTodo] = useState<TodoModel>({
        content: "",
        done: false,
    });

    return (
        <main css={css`background-color: #292929;`}>
            <div
                css={css`
                  background-color: ${TODO_COLOR[0]};
                  margin-bottom: 32px;
                  width: 344px;
                `}
            >
                <MainTodo
                    value={mainTodo.content}
                    prefixTodoNumber={1}
                    activeFingerBtn={true}
                    visibleToggleBtn={false}
                    visibleSubTodo={false}
                    editable={true}
                    checked={mainTodo.done}
                    onClickCheck={() => setMainTodo(prevState => ({
                        ...prevState,
                        done: !prevState.done
                    }))}
                    onChange={e => setMainTodo(prevState => ({
                        ...prevState,
                        content: e.target.value,
                    }))}
                ></MainTodo>
            </div>
            <div
                css={css`
                  background-color: ${TODO_COLOR[0]};
                  margin-bottom: 32px;
                  width: 344px;
                `}
            >
                <SubTodo
                    value={subTodo.content}
                    prefixTodoNumber={1}
                    editable={true}
                    checked={subTodo.done}
                    onClickCheck={() => setSubTodo(prevState => ({
                        ...prevState,
                        done: !prevState.done
                    }))}
                    onChange={e => setSubTodo(prevState => ({
                        ...prevState,
                        content: e.target.value,
                    }))}
                ></SubTodo>
            </div>
        </main>
    );
}
const inner = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px 20px;
`;
