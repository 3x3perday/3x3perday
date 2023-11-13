import React, { ButtonHTMLAttributes } from 'react';
import { Icon, ICON_MAP } from '@/components/Icon/Icon';
import { Button } from '@/components/Button/Button';

interface NumberButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    count?: number;
    isActive: boolean;
}

interface NumberIconProps {
    name: keyof typeof ICON_MAP;
    width: string;
    height: string;
}

type NumberIconType = {
    [key: number]: NumberIconProps;
}

const ActiveNumberMap: NumberIconType = {
  1: {
    name: 'sub-todo-one-active',
    width: '41px',
    height: '45px'
  },
  2: {
    name: 'sub-todo-two-active',
    width: '41px',
    height: '45px'
  },
  3: {
    name: 'sub-todo-three-active',
    width: '41px',
    height: '45px'
  }
}
const InActiveNumberMap: NumberIconType = {
  1: {
    name: 'sub-todo-one-inactive',
    width: '41px',
    height: '45px'
  },
  2: {
    name: 'sub-todo-two-inactive',
    width: '41px',
    height: '45px'
  },
  3: {
    name: 'sub-todo-three-inactive',
    width: '41px',
    height: '45px'
  }
}

const NumberButton = ({ count = 1, isActive, ...props }: NumberButtonProps) => {
  const options = isActive ? ActiveNumberMap[count] : InActiveNumberMap[count];
  return (
    <Button {...props}>
      <Icon {...options} />
    </Button>
  )
}

export default NumberButton;
