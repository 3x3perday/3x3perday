'use client'
import React, { Attributes, forwardRef, InputHTMLAttributes } from 'react';
import { css as style } from '@emotion/react';
interface Props extends InputHTMLAttributes<HTMLTextAreaElement>, Attributes {
    sortNum: string;
}

const TodoTextArea = forwardRef<HTMLTextAreaElement, Props>((
    {
        sortNum,
        css = style`background: red; display: flex; flex-direction: row;`,
        ...props
    }, ref) => (
    <div css={css}>
        {sortNum}
        <textarea ref={ref} {...props} />
    </div>
))

export default TodoTextArea
