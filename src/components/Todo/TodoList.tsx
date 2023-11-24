'use client'
import styles from './Todo.module.scss'
import { TodoMode } from '@/context/TodoModeContext';
import { TodoItem } from '@/types/todo';
import { Todo } from '@/components/Todo';
import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd';
import { Responders } from '@hello-pangea/dnd/src/types';
import { useState } from 'react';
import classNames from 'classnames';

interface Props {
    mode: TodoMode['mode'];
    data: TodoItem[];
    date: string;
}

const TodoList = ({ data, mode, date }: Props) => {
  const [todos, setTodos] = useState<Props['data']>(data);
  const isEmptyTodo = ({ mainTodo, subTodos }: TodoItem) => mainTodo.content === "" && subTodos.length === 0;
  const reorder = (list: Props['data'], startIndex: number, endIndex: number) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  const onDragEnd: Responders['onDragEnd'] = (result) => {
    if (!result.destination) {
      return;
    }
    const items = reorder(todos, result.source.index, result.destination.index);
    setTodos(items);
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 28
            }}
            {...provided.droppableProps}
          >
            <Todo.Provider mode={mode}>
              {
                todos.map((todo, idx) => isEmptyTodo(todo) ? (
                  <div
                    key={`todo--${todo.sortedId}`}
                    className={styles[`bg-${idx}`]}
                  >
                    <Todo.Empty
                      href={`/todo/edit/${date}`}
                      sortedId={todo.sortedId}
                    />
                  </div>
                ) : (
                  <Draggable
                    index={idx}
                    key={`todo--${todo.sortedId}`}
                    draggableId={`${todo.sortedId}`}
                  >
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        className={styles[`bg-${idx}`]}
                      >
                        <div className={styles.draggableContainer}>
                          <Todo.Main
                            sortedId={idx}
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
                          <div
                            {...provided.dragHandleProps}
                            className={classNames(styles.draggableHandler, styles[`bg-${idx}`])}
                          >
                          </div>
                        </div>
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
