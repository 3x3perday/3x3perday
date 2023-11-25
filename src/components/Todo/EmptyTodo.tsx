import styles from "./Todo.module.scss"
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
    <Link
      href={href}
    >
      <div className={styles.container}>
        <FingerIcon count={sortedId} isActive={false} />
        <Icon name="plus" className={styles.plusIcon} />
      </div>
    </Link>
  )
}
