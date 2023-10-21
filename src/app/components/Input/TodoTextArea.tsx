'use client'
import React, { Attributes, ChangeEvent, forwardRef, InputHTMLAttributes, useRef } from 'react';
import { css as style } from '@emotion/react';
import { resizeInputHeight } from '@/app/utils/dom';
interface Props extends InputHTMLAttributes<HTMLTextAreaElement>, Attributes {
    width?: number;
    isResizeHeight?: boolean;
}

const TodoTextArea = forwardRef<HTMLTextAreaElement, Props>((
    {
        width = 350,
        isResizeHeight = true,
        css = style`
            ${isResizeHeight && `
                -ms-overflow-style: none; /* IE and Edge */
                scrollbar-width: none; /* Firefox */
                ::-webkit-scrollbar {
                    display: none; /* Chrome, Safari, Opera*/
                }
            `}
            
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
        onChange,
        ...props
    }, ref) => {
    const onChangeTodo = (e:ChangeEvent<HTMLTextAreaElement>) => {
        if(isResizeHeight) {
            resizeInputHeight(e);
        }
        onChange && onChange(e);
    }
    return (
        <textarea
            ref={ref}
            rows={1}
            onChange={onChangeTodo}
            css={css}
            {...props}
        />
    )
})

export default TodoTextArea
