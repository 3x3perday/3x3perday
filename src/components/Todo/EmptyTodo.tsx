import Link, { LinkProps } from 'next/link';
import { TodoItem } from '@/types/todo';
import { Icon } from '@/components/Icon/Icon';
import './EmptyTodo.css';
import FingerButton from '@/components/Button/FingerButton';

interface EmptyTodoProps {
    sortedId: TodoItem['sortedId']
    href: LinkProps['href']
}

export const EmptyTodo = ({ sortedId, href }: EmptyTodoProps) => {
  return (
    <Link
      href={href}
      className="todo-empty-container"
    >
      <FingerButton fingerCount={sortedId} isActive={false} />
      <Icon name="plus" className='plus-icon' />
    </Link>
  )
}
