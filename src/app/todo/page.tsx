import dayjs from 'dayjs';
import { DateNavBar } from '@/components/navbar/DateNavBar';
import { http } from '@/utils/http';
import { Date } from '@/utils/date';
import { TodoItem, TodoResponse } from '@/types/todo';
import { AppBar } from '@/components/navbar/AppBar';
import { SubTodo } from '@/components/Todo/SubTodo';
import { Todo } from '@/components/Todo';

const getTodoData = async (date: string): Promise<TodoResponse> => {
  const userId = "6550c5aafb5e55258e167592";
  const res = await http.get(`http://localhost:3000/api/todo/?userId=${userId}&date=${date}`, {
    cache: 'no-cache'
  });
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
    // todos: DEFAULT_TODO
    todos: [
      {
        sortedId: 0,
        mainTodo: {
          content: "hello",
          done: false,
        },
        subTodos: [
          {content: 'a', done: false},
          {content: 'a', done: false},
          {content: 'a', done: false},
        ]
      },
      {
        sortedId: 1,
        mainTodo: {
          content: "hello",
          done: false,
        },
        subTodos: [
          {content: 'a', done: false},
          {content: 'a', done: false},
          {content: 'a', done: false},
        ]
      },
      {
        sortedId: 2,
        mainTodo: {
          content: "",
          done: false,
        },
        subTodos: []
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

  const isEmptyTodo = ({ mainTodo, subTodos }: TodoItem) => mainTodo.content === "" && subTodos.length === 0;
  return (
    <main>
      <AppBar />
      <DateNavBar date={date} minDate={minDate} maxDate={maxDate} />
      <Todo.Provider mode={'read'}>
        {
          todos.map(todo => (
            <div key={`todo--${todo.sortedId}`}>
              {
                isEmptyTodo(todo) ? (
                  <Todo.Empty
                    href={`/todo/edit/${date}`}
                    sortedId={todo.sortedId}
                  />
                ) : (
                  <Todo.Main
                    sortedId={todo.sortedId}
                    content={todo.mainTodo.content}
                    done={todo.mainTodo.done}
                  >
                    {
                      todo.subTodos.map((subTodo, idx) => (
                        <div key={`sub-todo--${idx}`}>
                          <Todo.Sub
                            subTodoId={idx}
                            content={subTodo.content}
                            done={subTodo.done}
                          />
                        </div>
                      ))
                    }
                  </Todo.Main>
                )
              }
            </div>
          ))
        }
      </Todo.Provider>
    </main>
  )
}
