import dayjs from 'dayjs';
import { DateNavBar } from '@/components/navbar/DateNavBar';
import { http } from '@/utils/http';
import { Date } from '@/utils/date';
import { EmptyTodo } from '@/components/Todo/EmptyTodo';
import { TodoResponse } from '@/types/todo';

const getTodoData = async (date: string): Promise<TodoResponse> => {
  const userId = "6550c5aafb5e55258e167592";
  const res = await http.get(`http://localhost:3000/api/todo/?userId=${userId}&date=${date}`);
  if (res.status === 200) {
    return {
      userId: '',
      date: '',
      todos: await res.json(),
    };
  }
  return {
    userId,
    date: '',
    todos: [
      {
        sortedId: 0,
        mainTodo: { content: "", done: false },
        subTodos: [],
      },
      {
        sortedId: 1,
        mainTodo: { content: "", done: false },
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

type Props = {
    searchParams: {
        date: string;
    }
}

export default async function TodoPage({ searchParams }: Props) {
  const today = Date.getToday();
  const date = Date.valid(searchParams.date) ? searchParams.date : today;
  const { todos } = await getTodoData(date);

  const { minDate, maxDate } = Date.getMinAndMaxDate(today, 1, 0);
  const validMinDate = dayjs(date).diff(minDate, 'd') >= 0;
  const validMaxDate = dayjs(date).diff(maxDate, 'd') <= 0;
  if (!(validMinDate && validMaxDate)) {
    throw new Error(`${minDate} ~ ${maxDate} 사이의 정보만 조회할 수 있어요.`)
  }

  return (
    <main>
      <DateNavBar date={date} minDate={minDate} maxDate={maxDate} />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        {
          todos.map(todo => (
            <div key={`todo--${todo.sortedId}`}>
              <div>{todo.mainTodo.content}</div>
              {
                todo.subTodos.map((subTodo, idx) => (
                  <div key={`sub-todo--${idx}`}>{subTodo.content}</div>
                ))
              }
              <EmptyTodo sortedId={todo.sortedId} />
            </div>
          ))
        }
      </div>
    </main>
  )
}
