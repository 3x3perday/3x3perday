'use client'
import React, { Attributes, forwardRef, InputHTMLAttributes } from 'react';
import { css as style } from '@emotion/react';
interface Props extends InputHTMLAttributes<HTMLInputElement>, Attributes {
    sortNum: string;
}

const TodoInput = forwardRef<HTMLInputElement, Props>((
    {
        sortNum,
        css = style`background: red; display: flex; flex-direction: row;`,
        ...props
    }, ref) => (
    <div css={css}>
        {sortNum}
        <input ref={ref} {...props} />
    </div>
))

export default TodoInput
