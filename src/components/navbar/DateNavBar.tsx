'use client';
import styles from './DateNavBar.module.scss'
import { Date } from "@/utils/date";
import { Icon } from '@/components/Icon/Icon';
import { http } from '@/utils/http';
import { useEffect, useRef, useState } from 'react';
import { TodoItem, TodoResponse } from '@/types/todo';
import { useRouter } from 'next/navigation';

interface Props {
    selectedDate: string;
    minDate?: string;
    maxDate?: string;
}

export const DateNavBar = ({ selectedDate, minDate, maxDate }: Props) => {
  const router = useRouter();
  const userId = useRef<string>('');
  const [disablePrevDate, setDisablePrevDate] = useState<boolean>(true);
  const navDate = {
    prev: Date.getPrevDate(selectedDate, 1),
    current: selectedDate,
    next: Date.getNextDate(selectedDate, 1),
  };

  const checkEmptyTodo = (todos: TodoItem[]) => todos.every(todo => todo.mainTodo.content === "");

  const onChangeDate = (date:string, disabled = false) => () => {
    if(disabled) return;
    router.replace(`?date=${date}`)
  }

  const getTodoForPrevDate = async (prevDate: string) => {
    const res = await http.get(`/api/todo/?userId=${userId.current}&date=${prevDate}`);
    const { todos } = await res.json() as TodoResponse;
    const isEmptyTodo = checkEmptyTodo(todos);
    setDisablePrevDate(isEmptyTodo);
  }

  useEffect(() => {
    userId.current = localStorage.getItem("userId") || "1234";
    if(Date.diffDay(Date.getToday(), selectedDate) === 0) {
      getTodoForPrevDate(selectedDate);
    }
  }, [selectedDate]);

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div
          hidden={minDate === selectedDate}
          onClick={onChangeDate(navDate.prev, disablePrevDate)}
          className={styles.leftArrow}
        >
          <Icon name={disablePrevDate ? "date-arrow" : "date-arrow-active"} width='20px' height='20px' />
        </div>
        <p>{navDate.current}</p>
        <div
          hidden={maxDate === selectedDate}
          onClick={onChangeDate(navDate.next)}
          className={styles.rightArrow}
        >
          <Icon name="date-arrow-active" width='20px' height='20px' />
        </div>
      </div>
    </div>
  )
}
