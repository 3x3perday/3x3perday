import React from 'react';
import { Icon, ICON_MAP } from '@/components/Icon/Icon';

interface NumberButtonProps {
    count?: number;
    isActive: boolean;
}

type NumberIconType = {
    [key: number]: {
      name: keyof typeof ICON_MAP;
      width: string;
      height: string;
    };
}

const ActiveNumberMap: NumberIconType = {
  0: {
    name: 'sub-todo-one-active',
    width: '41px',
    height: '45px'
  },
  1: {
    name: 'sub-todo-two-active',
    width: '41px',
    height: '45px'
  },
  2: {
    name: 'sub-todo-three-active',
    width: '41px',
    height: '45px'
  }
}
const InActiveNumberMap: NumberIconType = {
  0: {
    name: 'sub-todo-one-inactive',
    width: '41px',
    height: '45px'
  },
  1: {
    name: 'sub-todo-two-inactive',
    width: '41px',
    height: '45px'
  },
  2: {
    name: 'sub-todo-three-inactive',
    width: '41px',
    height: '45px'
  }
}

const NumberIcon = ({ count = 0, isActive }: NumberButtonProps) => {
  const options = isActive ? ActiveNumberMap[count] : InActiveNumberMap[count];
  return (
    <Icon {...options} />
  )
}

export default NumberIcon;
