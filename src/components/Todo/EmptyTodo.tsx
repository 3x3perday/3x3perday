import styles from "./todo.module.scss"
import Link, { LinkProps } from 'next/link';
import { TodoItem } from '@/types/todo';
import { Icon } from '@/components/Icon/Icon';
import FingerIcon from '@/components/Icon/FingerIcon';

interface Props {
    sortedId: TodoItem['sortedId']
    href: LinkProps['href']
}

export const EmptyTodo = ({ sortedId, href }: Props) => {
  return (
    <div className={styles.container}>
      <Link
        href={href}
      >
        <FingerIcon count={sortedId} isActive={false} />
        <Icon name="plus" className={styles.plusIcon} />
      </Link>
    </div>
  )
}
