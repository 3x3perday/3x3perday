'use client'
import React, { Attributes, forwardRef, InputHTMLAttributes, useRef } from 'react';
import { css as style } from '@emotion/react';
interface Props extends InputHTMLAttributes<HTMLTextAreaElement>, Attributes {
    width?: number;
}

const TodoTextArea = forwardRef<HTMLTextAreaElement, Props>((
    {
        width = 350,
        css = style`
            -ms-overflow-style: none; /* IE and Edge */
            scrollbar-width: none; /* Firefox */
            ::-webkit-scrollbar {
                display: none; /* Chrome, Safari, Opera*/
            }
            
            text-transform: uppercase;
            font-size: 100px;
            display: flex;
            flex-direction: row;
            background-color: transparent;
            width: ${width}px;
            resize: none;
            outline: none;
            border: 0;  
        `,
        ...props
    }, ref) => {
    return (
        <textarea
            ref={ref}
            rows={1}
            css={css}
            {...props}
        />
    )
})

export default TodoTextArea
