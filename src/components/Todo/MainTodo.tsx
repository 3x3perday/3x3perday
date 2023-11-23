'use client'
import styles from "./Todo.module.scss"
import FingerIcon from '@/components/Icon/FingerIcon';
import { TodoBase, TodoItem } from '@/types/todo';
import { ChangeEvent, ReactNode, useContext, useState } from 'react';
import { TodoModeContext } from '@/context/TodoModeContext';

interface Props extends TodoBase {
    sortedId: TodoItem['sortedId'];
    children?: ReactNode;
}

export const MainTodo = ({content, done, sortedId, children}:Props) => {
  const [value, setValue] = useState(content);
  const { mode } = useContext(TodoModeContext);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value)
  };

  const onChecked = async () => {
    if(mode === 'update') return;
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
        <button disabled={mode === 'update'} onClick={onChecked}>
          <FingerIcon count={sortedId} isActive={done} />
        </button>
        {
          mode === 'read' ? <p style={{width: '100%'}}>{content}</p> : <input value={value} onChange={onChange} />
        }
      </div>
      {children}
    </>
  )
}
