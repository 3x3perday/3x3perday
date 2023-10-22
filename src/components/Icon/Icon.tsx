'use client'

import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

const plusBg = css`
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='46' height='42' viewBox='0 0 46 42' fill='none'%3E%3Cpath d='M15.361 42V27.6667H0V14.3333H15.361V0H30.639V14.3333H46V27.6667H30.639V42H15.361Z' fill='%23292929'/%3E%3C/svg%3E");
`

const IconMap = {
    'plus': plusBg
} as const;

interface IconProps {
    name: keyof typeof IconMap;
    width?: string;
    height?: string;
}

const IconStyleCSS = (props:IconProps) =>
    css`
      position: relative;
      cursor: pointer;
      width: ${props.width ?? '2.875rem'};
      height: ${props.height ?? '2.875rem'};

      ::after {
        content: "";
        ${IconMap[props.name]}
        background-position: 50% 50%;
        background-repeat: no-repeat;
        width: ${props.width ?? '2.875rem'};
        height: ${props.height ?? '2.875rem'};
        font-size: 4rem;
        color: #FFF;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    `

export const Icon = styled.div`
  ${IconStyleCSS};
`
