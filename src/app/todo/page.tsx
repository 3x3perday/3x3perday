import dayjs from 'dayjs';
import { DateNavBar } from '@/components/navbar/DateNavBar';
import { http } from '@/utils/http';
import { Date } from '@/utils/date';
import { TodoItem, TodoResponse } from '@/types/todo';
import { AppBar } from '@/components/navbar/AppBar';
import { Todo } from '@/components/Todo';
import { DEFAULT_TODO } from '@/constants/Todo';
import TodoList from '@/components/Todo/TodoList';

const createInitialTodo = async (userId: string, date: string) => {
  const res = await http.post(`http://localhost:3000/api/todo?userId=${userId}&date=${date}`, null)
  return res.status === 200;
}

const getTodoData = async (userId: string, date: string): Promise<TodoResponse> => {
  const res = await http.get(`http://localhost:3000/api/todo/?userId=${userId}&date=${date}`, { cache: 'no-cache' });

  if (res.status === 200) {
    const { todos, date, userId } = await res.json() as TodoResponse;
    return { userId, date, todos };
  }
  if (res.status === 400) {
    await createInitialTodo(userId, date);
  }
  return { userId, date, todos: DEFAULT_TODO };
}

type Props = {
    searchParams: {
        date: string;
    }
}

export default async function TodoPage({ searchParams }: Props) {
  const today = Date.getToday();
  const date = Date.valid(searchParams.date) ? searchParams.date : today;
  const userId = "6550c5aafb5e55258e167592";
  const { todos } = await getTodoData(userId, date);

  const { minDate, maxDate } = Date.getMinAndMaxDate(today, 1, 0);
  const validMinDate = dayjs(date).diff(minDate, 'd') >= 0;
  const validMaxDate = dayjs(date).diff(maxDate, 'd') <= 0;

  if (!(validMinDate && validMaxDate)) {
    throw new Error(`${minDate} ~ ${maxDate} 사이의 정보만 조회할 수 있어요.`)
  }

  const isEmptyTodo = ({ mainTodo, subTodos }: TodoItem) => mainTodo.content === "" && subTodos.length === 0;

  return (
    <main>
      <AppBar />
      <DateNavBar date={date} minDate={minDate} maxDate={maxDate} />
      <TodoList mode={"read"} data={todos} date={date} />
    </main>
  )
}
