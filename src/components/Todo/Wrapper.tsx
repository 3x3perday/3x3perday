import styles from '@/components/Todo/Todo.module.scss';
import { HTMLAttributes, ReactNode } from 'react';
import classNames from 'classnames';

interface Props extends HTMLAttributes<HTMLDivElement> {
    sortedId: number;
    children?: ReactNode;
}
export const Wrapper = ({sortedId, children, className , ...props}:Props) => {
  return <div  {...props} className={ classNames([styles[`bg-${sortedId}`],className])}>{children}</div>
}
