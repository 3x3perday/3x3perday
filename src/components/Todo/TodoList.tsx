'use client'
import styles from './Todo.module.scss'
import { TodoMode } from '@/context/TodoModeContext';
import { TodoItem, TodoResponse } from '@/types/todo';
import { Todo } from '@/components/Todo';
import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd';
import { Responders } from '@hello-pangea/dnd/src/types';
import { useEffect, useRef, useState } from 'react';
import { http } from '@/utils/http';
import { DEFAULT_TODO } from '@/constants/Todo';
import { dnd } from '@/utils/dnd';

const DraggableHandler = Todo.Wrapper;

const createInitialTodo = async (userId: string, date: string) => {
  const res = await http.post(`/api/todo?userId=${userId}&date=${date}`, null);
  return res.status
}

const getTodoData = async (userId: string, date: string): Promise<TodoResponse> => {
  await createInitialTodo(userId, date);

  const res = await http.get(`/api/todo/?userId=${userId}&date=${date}`);
  if (res.status === 200) {
    const { todos, date, userId } = await res.json() as TodoResponse;
    return { userId, date, todos };
  }
  return { userId, date, todos: DEFAULT_TODO };
}

interface Props {
    mode: TodoMode['mode'];
    date: string;
}

const TodoList = ({ mode, date }: Props) => {
  const userId = useRef('');
  const [todos, setTodos] = useState<TodoItem[]>(DEFAULT_TODO);
  const [toggleState, setToggleState] = useState([false, false, false]);

  const onChangeToggle = (mainTodoIndex: number) => setToggleState(prevState => prevState.map((v, i) => i === mainTodoIndex ? !v : v));

  const isEmptyTodo = ({ mainTodo, subTodos }: TodoItem) => mainTodo.content === "" && subTodos.length === 0;

  const onDragEnd: Responders['onDragEnd'] = (result) => {
    if (!result.destination) {
      return;
    }
    const sortedItems = dnd.reorder<TodoItem>(todos, result.source.index, result.destination.index);
    setTodos(sortedItems);
  }

  const getInitTodoData = async () => {
    const { todos } = await getTodoData(userId.current, date);
    setTodos(todos);
  }

  const updateTodo = async () => {
    const receiveData:TodoResponse = {
      userId: userId.current,
      date,
      todos: [
        {
          sortedId: 0,
          mainTodo: { content: "Hello", done: false },
          subTodos: [],
        },
        {
          sortedId: 1,
          mainTodo: { content: "Test", done: false },
          subTodos: [],
        },
        {
          sortedId: 2,
          mainTodo: { content: "", done: false },
          subTodos: [],
        },
      ]
    }

    const result = await http.put('/api/todo', receiveData);
  }

  useEffect(() => {
    userId.current = localStorage.getItem("userId") || "1234";
    getInitTodoData();
  }, [date]);


  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            className={styles.todoListContainer}
            {...provided.droppableProps}
          >
            <Todo.Provider mode={mode}>
              {
                todos.map((todo, mainTodoIndex) => isEmptyTodo(todo) ? (
                  <Todo.Wrapper
                    sortedId={todo.sortedId}
                    key={`todo--${todo.sortedId}`}
                  >
                    <Todo.Empty
                      href={`/todo/edit/${date}?sortedId=${todo.sortedId}`}
                      sortedId={todo.sortedId}
                    />
                  </Todo.Wrapper>
                ) : (
                  <Draggable
                    index={mainTodoIndex}
                    key={`todo--${todo.sortedId}`}
                    draggableId={`${todo.sortedId}`}
                  >
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}

                      >
                        <Todo.Wrapper
                          sortedId={mainTodoIndex}
                          className={styles.draggableContainer}
                        >
                          <Todo.Main
                            sortedId={mainTodoIndex}
                            content={todo.mainTodo.content}
                            done={todo.mainTodo.done}
                          />
                          <Todo.Toggle
                            isActive={toggleState[mainTodoIndex]}
                            onClick={() => onChangeToggle(mainTodoIndex)}
                          />
                          <DraggableHandler
                            {...provided.dragHandleProps}
                            sortedId={mainTodoIndex}
                            className={styles.draggableHandler}
                          />
                        </Todo.Wrapper>
                        {
                          toggleState[mainTodoIndex] && todo.subTodos.map((subTodo, idx) => (
                            <Todo.Wrapper
                              key={`sub-todo--${idx}`}
                              sortedId={mainTodoIndex}
                              style={{ marginLeft: '95px' }}
                            >
                              <Todo.Sub
                                subTodoId={idx}
                                content={subTodo.content}
                                done={subTodo.done}
                              />
                            </Todo.Wrapper>
                          ))
                        }
                      </div>
                    )}
                  </Draggable>
                ))

              }
            </Todo.Provider>
          </div>
        )}
      </Droppable>
    </DragDropContext>
  )
}

export default TodoList
