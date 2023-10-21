'use client'
import React, { forwardRef, InputHTMLAttributes } from 'react';
import { css } from '@emotion/react';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
    sortNum: string;
}

const inputWrapper = css`
      display: flex;
      flex-direction: row;
    `;

const TodoInput = forwardRef<HTMLInputElement, Props>(({sortNum, ...props}, ref) => (
    <div css={inputWrapper}>
        {sortNum}
        <input ref={ref} {...props} />
    </div>
))

export default TodoInput
