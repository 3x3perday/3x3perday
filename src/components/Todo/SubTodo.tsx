'use client'
import styles from "./todo.module.scss"
import { ChangeEvent, useContext, useState } from 'react';
import { TodoModeContext } from '@/context/TodoModeContext';
import { TodoBase } from '@/types/todo';
import { http } from '@/utils/http';
import NumberIcon from '@/components/Icon/NumberIcon';

interface Props extends TodoBase {
  subTodoId: number;
}

export const SubTodo = ({ content, done, subTodoId }: Props) => {
  const [value, setValue] = useState(content);
  const { mode } = useContext(TodoModeContext);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value)
  };

  const onChecked = async () => {
    if(mode === 'update') return;
    /**
     * TODO
     * 서브 투두 done 상태 반영
     */
    // http.patch('', {})
  }

  return (
    <div className={styles.subTodoContainer}
    >
      <button disabled={mode === 'update'} onClick={onChecked}>
        <NumberIcon count={subTodoId} isActive={done} />
      </button>
      {
        mode === 'read' ? <p style={{width: '100%'}}>{content}</p> : <input value={value} onChange={onChange} />
      }
    </div>
  )
}
