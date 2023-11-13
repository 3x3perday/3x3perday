import React, { ButtonHTMLAttributes } from 'react';
import { Icon, ICON_MAP } from '@/components/Icon/Icon';

interface FingerButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    fingerCount?: number
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
  0: {
    name: 'hand-one-active',
    width: '79px',
    height: '136.624px',
  },
  1: {
    name: 'hand-two-active',
    width: '81px',
    height: '139px',
  },
  2: {
    name: 'hand-three-active',
    width: '77px',
    height: '147px',
  }
}
const InActiveFingerMap: FingerIconType = {
  0: {
    name: 'hand-one-inactive',
    width: '79px',
    height: '136.624px',
  },
  1: {
    name: 'hand-two-inactive',
    width: '81px',
    height: '139px',
  },
  2: {
    name: 'hand-three-inactive',
    width: '77px',
    height: '147px',
  }
}

const FingerButton = ({ fingerCount = 1, isActive, ...props }: FingerButtonProps) => {
  const options = isActive ? ActiveFingerMap[fingerCount] : InActiveFingerMap[fingerCount];
  return (
    <Icon
      {...options}
    />
  )
}

export default FingerButton;
