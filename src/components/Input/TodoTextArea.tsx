'use client'
import React, { Attributes, ChangeEvent, forwardRef, InputHTMLAttributes, useEffect, useRef, useState } from 'react';
import { css as style } from '@emotion/react';
import { Simulate } from 'react-dom/test-utils';

interface Props extends InputHTMLAttributes<HTMLTextAreaElement>, Attributes {
    width?: string;
    height?: string;
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
    font-family: Pretendard;
    font-size: 2.8125rem;
    font-style: normal;
    font-weight: 800;
    line-height: 3.3125rem; /* 117.778% */
    text-transform: uppercase;
    resize: none;
    outline: none;
    background-color: transparent;
`;
export const TodoTextArea = forwardRef<HTMLTextAreaElement, Props>((
    {
        width = '100%',
        height = '169px',
        isResizeHeight = true,
        css = style`
            ${isResizeHeight && invisibleScroll}
            ${textStyle}
            width: ${width};
            height: ${height};
        `,
        onChange,
        ...props
    }, ref) => {
    const textAreaRef = useRef<HTMLTextAreaElement | unknown>(ref);
    const [maxHeight, setMaxHeight] = useState(0);

    const onChangeTodo = (e: ChangeEvent<HTMLTextAreaElement>) => {
        if (e.target.scrollHeight === Number(maxHeight)) {
            onChange && onChange(e);
        }
    }

    useEffect(() => {
        setMaxHeight(textAreaRef.current.clientHeight)
    }, []);

    return (
        <textarea
            {...props}
            ref={textAreaRef}
            rows={1}
            onChange={onChangeTodo}
            css={css}
        />
    )
})
