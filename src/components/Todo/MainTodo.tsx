'use client'
import styles from "./Todo.module.scss"
import FingerIcon from '@/components/Icon/FingerIcon';
import { TodoBase, TodoItem } from '@/types/todo';
import { ChangeEvent, ReactNode, useContext, useState } from 'react';
import { TodoModeContext } from '@/context/TodoModeContext';
import { Icon } from '@/components/Icon/Icon';

interface Props extends TodoBase {
    sortedId: TodoItem['sortedId'];
    children?: ReactNode;
}

export const MainTodo = ({ content, done, sortedId, children }: Props) => {
  const [value, setValue] = useState(content);
  const { mode } = useContext(TodoModeContext);
  const [visibleChildren, setVisibleChildren] = useState(false);

  const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.currentTarget.value)
  };

  const onChecked = async () => {
    if (mode === 'edit') return;
    /**
         * TODO
         * 메인 투두 done 상태 반영
         */
    // http.patch('', {})
  }

  return (
    <>
      <div
        className={styles.container}
      >
        <button disabled={mode === 'edit'} onClick={onChecked}>
          <FingerIcon count={sortedId} isActive={done} />
        </button>
        {
          mode === 'read' ? <p style={{ width: '100%' }}>{content}</p> : <textarea value={value} onChange={onChange} />
        }
        <div className={styles.toggleBtn} onClick={() => setVisibleChildren(prevState => !prevState)}>
          <div className={visibleChildren ? styles.toggleBtnActive : styles.toggleBtnInActive}>
            <Icon name={"arrow-up"} width="19px" height="13px" />
          </div>
        </div>
      </div>
      {visibleChildren && children}
    </>
  )
}
