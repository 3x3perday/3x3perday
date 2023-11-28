import dayjs from 'dayjs';
import { DateNavBar } from '@/components/navbar/DateNavBar';
import { http } from '@/utils/http';
import { Date } from '@/utils/date';
import { TodoResponse } from '@/types/todo';
import { AppBar } from '@/components/navbar/AppBar';
import { DEFAULT_TODO } from '@/constants/Todo';
import TodoList from '@/components/Todo/TodoList';
import GiveMeFive from '@/components/modal/GiveMeFive';

const createInitialTodo = async (userId: string, date: string) => {
  const res = await http.post(`http://localhost:3000/api/todo?userId=${userId}&date=${date}`, null, { cache: 'no-cache' });
  return res.status === 200;
}

const getTodoData = async (userId: string, date: string): Promise<TodoResponse> => {
  await createInitialTodo(userId, date);

  const res = await http.get(`http://localhost:3000/api/todo/?userId=${userId}&date=${date}`, { cache: 'no-cache' });
  if (res.status === 200) {
    const { todos, date, userId } = await res.json() as TodoResponse;
    return {
      userId, date, todos: [
        {
          sortedId: 0,
          mainTodo: { content: "abcd", done: false },
          subTodos: [
            { content: "abcd", done: false },
            { content: "abcd", done: false },
          ],
        },
        {
          sortedId: 1,
          mainTodo: { content: "123", done: true },
          subTodos: [],
        },
        {
          sortedId: 2,
          mainTodo: { content: "", done: false },
          subTodos: [],
        },
      ]
    };
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

  return (
    <main>
      <AppBar />
      <DateNavBar date={date} minDate={minDate} maxDate={maxDate} />
      <div className="inner">
        <TodoList mode={"read"} data={todos} date={date} />
      </div>
    </main>
  )
}
