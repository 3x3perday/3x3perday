import Link from 'next/link';
import { TodoItem } from '@/types/todo';
import { Icon, ICON_MAP } from '@/components/Icon/Icon';
import './EmptyTodo.css'


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


export const EmptyTodo = ({ sortedId }: Pick<TodoItem, "sortedId">) => {
  return (
    <Link
      href="/todo/edit"
      className="todo-empty-container"
    >
      <Icon {...InActiveFingerMap[sortedId]} />
      <Icon name="plus" className='plus-icon' />
    </Link>
  )
}
