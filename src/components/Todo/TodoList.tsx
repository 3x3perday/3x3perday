'use client'
import styles from './Todo.module.scss'
import { TodoMode } from '@/context/TodoModeContext';
import { TodoItem } from '@/types/todo';
import { Todo } from '@/components/Todo';
import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd';
import { Responders } from '@hello-pangea/dnd/src/types';
import { useState } from 'react';

const DraggableHandler = Todo.Wrapper;

interface Props {
    mode: TodoMode['mode'];
    data: TodoItem[];
    date: string;
}

const TodoList = ({ data, mode, date }: Props) => {
  const [todos, setTodos] = useState<Props['data']>(data);
  const [toggleState, setToggleState] = useState([false, false, false]);
  const onChangeToggle = (mainTodoIndex: number) => setToggleState(prevState => prevState.map((v, i) => i === mainTodoIndex ? !v : v));

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
