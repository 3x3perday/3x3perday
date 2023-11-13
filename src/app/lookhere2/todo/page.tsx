import { http } from '@/utils/http';
import { Date } from '@/utils/date';
import { DateNavBar } from '@/components/navbar/DateNavBar';
import dayjs from 'dayjs';

interface Todo {
    content: string;
    done: boolean;
}

interface TodoItem {
    sortedId: number;
    mainTodo: Todo;
    subTodos: Todo[];
}

interface TodoResponse {
    todos: TodoItem[];
}

const getTodoData = async (date: string): Promise<TodoResponse> => {
  const userId = "6550c5aafb5e55258e167592";
  const res = await http.get(`http://localhost:3000/api/todo/?userId=${userId}&date=${date}`);
  if (res.status === 200) {
    return {
      todos: await res.json(),
    };
  }
  return {
    todos: [
      {
        sortedId: 0,
        mainTodo: { content: "main-1", done: false },
        subTodos: [
          { content: "sub-1", done: false },
          { content: "sub-2", done: false }
        ],
      },
      {
        sortedId: 1,
        mainTodo: { content: "main-2", done: false },
        subTodos: [],
      },
      {
        sortedId: 2,
        mainTodo: { content: "main-3", done: false },
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
      {
        todos.map(todo => (
          <div key={`todo--${todo.sortedId}`}>
            <div>{todo.mainTodo.content}</div>
            {
              todo.subTodos.map((subTodo, idx) => (
                <div key={`sub-todo--${idx}`}>{subTodo.content}</div>
              ))
            }
          </div>
        ))
      }
    </main>
  )
}
