'use client'
import React, { Attributes, ChangeEvent, forwardRef, InputHTMLAttributes } from 'react';
import { css as style } from '@emotion/react';
import { resizeInputHeight } from '@/utils/dom';
interface Props extends InputHTMLAttributes<HTMLTextAreaElement>, Attributes {
    width?: string;
    isResizeHeight?: boolean;
}

const invisibleScroll = `
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
    ::-webkit-scrollbar {
        display: none; /* Chrome, Safari, Opera*/
    }
`;
const textStyle = `
    text-transform: uppercase;
    font-size: 6.25rem;
    display: flex;
    flex-direction: row;
    background-color: transparent;
    resize: none;
    outline: none;
    border: 0;
`;
const TodoTextArea = forwardRef<HTMLTextAreaElement, Props>((
    {
        width = '100%',
        isResizeHeight = true,
        css = style`
            ${isResizeHeight && invisibleScroll}
            ${textStyle}
            width: ${width};
        `,
        onChange,
        ...props
    }, ref) => {
    const onChangeTodo = (e: ChangeEvent<HTMLTextAreaElement>) => {
        if (isResizeHeight) {
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
