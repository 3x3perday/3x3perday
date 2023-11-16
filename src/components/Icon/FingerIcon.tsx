import React from 'react';
import { Icon, ICON_MAP } from '@/components/Icon/Icon';

interface Props {
    count?: number
    isActive: boolean;
}

type FingerIconType = {
    [key: number]: {
      name: keyof typeof ICON_MAP;
      width: string;
      height: string;
    };
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

const FingerIcon = ({ count = 0, isActive }: Props) => {
  const options = isActive ? ActiveFingerMap[count] : InActiveFingerMap[count];
  return (
    <Icon {...options} />
  )
}

export default FingerIcon;
