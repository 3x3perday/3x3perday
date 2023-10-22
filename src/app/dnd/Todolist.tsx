import { Icon } from "@/components/Icon/Icon";
import { TodoTextInput } from "@/components/Input";
import { TodoItem } from "@/components/Item/TodoItem";
import { TODO_COLOR } from "@/constants/Theme";
import { Todo3x3Model } from "@/types/todo";
import { useDnD } from "@/utils/dnd";
import { css } from "@emotion/react";
import {
  DragDropContext,
  Draggable,
  DropResult,
  Droppable,
} from "@hello-pangea/dnd";
import Image from "next/image";
import React from "react";

interface Props {
  todos: TodoView[];
  setTodos: React.Dispatch<React.SetStateAction<TodoView[]>>;
}
interface TodoView extends Todo3x3Model {
  visibleSubTodo: boolean;
}
const Todolist = ({ todos, setTodos }: Props) => {
  useDnD();
  const onDragEnd = ({ source, destination }: DropResult) => {
    if (!destination) return;
    const _items = JSON.parse(JSON.stringify(todos)) as typeof todos;

    const [targetItem] = _items.splice(source.index, 1);

    _items.splice(destination.index, 0, targetItem);

    setTodos(_items);
  };

  const onClickToggle = (mainTodoId: number, state: boolean) => {
    setTodos((prevState) =>
      prevState.map((itemm) => {
        if (itemm.id === mainTodoId) {
          itemm.visibleSubTodo = state;
        }
        return itemm;
      })
    );
  };

  const onClickTodo = (todoId: number) => () => {
    console.log(todoId);
  };

  return (
    <div css={inner}>
      {/* {todos.map((todo, index) => (
        <div key={todo.id} css={todoCSS(index)}>
          {todo.mainTodo.content !== "" ? (
            <TodoItem
              id={todo.id}
              mainTodo={todo.mainTodo}
              subTodos={todo.subTodos}
              visibleSubTodo={todo.visibleSubTodo}
              visibleToggleBtn={todo.subTodos.length > 0}
              onClickToggle={onClickToggle}
            />
          ) : (
            <Icon
              name={"plus"}
              width={"344px"}
              height={"169px"}
              onClick={onClickTodo(todo.id)}
            >
              <TodoTextInput
                prefixText={`${todo.id}`}
                value={todo.mainTodo.content}
                editable={false}
              />
            </Icon>
          )}
        </div>
      ))} */}

      <div>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {todos.map((todo, index) => (
                  <Draggable
                    key={todo.id}
                    draggableId={String(todo.id)}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        key={todo.id}
                        css={todoCSS(index)}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                      >
                        <div className="drag_btn" {...provided.dragHandleProps}>
                          <Image
                            src="/icon/drag_icon.png"
                            width={15}
                            height={15}
                            alt="drag"
                          />
                        </div>

                        {todo.mainTodo.content !== "" ? (
                          <TodoItem
                            id={todo.id}
                            mainTodo={todo.mainTodo}
                            subTodos={todo.subTodos}
                            visibleSubTodo={todo.visibleSubTodo}
                            visibleToggleBtn={todo.subTodos.length > 0}
                            onClickToggle={onClickToggle}
                          />
                        ) : (
                          <Icon
                            name={"plus"}
                            width={"344px"}
                            height={"169px"}
                            onClick={onClickTodo(todo.id)}
                          >
                            <TodoTextInput
                              prefixText={`${todo.id}`}
                              value={todo.mainTodo.content}
                              editable={false}
                            />
                          </Icon>
                        )}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  );
};

export default Todolist;
const inner = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px 20px;
`;
const todoCSS = (index: number) => css`
  background-color: ${TODO_COLOR[index]};
  margin-bottom: 32px;
  width: 344px;
  min-height: 169px;
  position: relative;
  .drag_btn {
    width: 15px;
    height: 15px;
    position: absolute;
    top: 3px;
    right: 3px;
    z-index: 1;
  }
`;
