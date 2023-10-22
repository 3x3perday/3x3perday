import React, { ButtonHTMLAttributes } from 'react';
import { Icon, ICON_MAP } from '@/components/Icon/Icon';
import { css } from '@emotion/react';

interface FingerButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    fingerCount?: 1 | 2 | 3;
    isActive: boolean;
}

interface FingerIconProps {
    name: keyof typeof ICON_MAP;
    width: string;
    height: string;
}

type FingerIconType = {
    [key: number]: FingerIconProps;
}

const ActiveFingerMap: FingerIconType = {
    1: {
        name: 'hand-one-active',
        width: '79px',
        height: '136.624px',
    },
    2: {
        name: 'hand-two-active',
        width: '81px',
        height: '139px',
    },
    3: {
        name: 'hand-three-active',
        width: '77px',
        height: '147px',
    }
}
const InActiveFingerMap: FingerIconType = {
    1: {
        name: 'hand-one-inactive',
        width: '79px',
        height: '136.624px',
    },
    2: {
        name: 'hand-two-inactive',
        width: '81px',
        height: '139px',
    },
    3: {
        name: 'hand-three-inactive',
        width: '77px',
        height: '147px',
    }
}

const FingerButton = ({ fingerCount = 1, isActive, ...props }: FingerButtonProps) => {
    const options = isActive ? ActiveFingerMap[fingerCount] : InActiveFingerMap[fingerCount];
    return (
        <button css={buttonStyleCSS} {...props}>
            <Icon
                {...options}
            />
        </button>
    )
}
const buttonStyleCSS = css`
  outline: none;
  border: 0;
  background-color: transparent;
`;

export default FingerButton;
