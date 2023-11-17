import { TodoBase, TodoItem } from "@/types/todo";
import React from "react";

interface Props {
  subTodo: TodoBase;
  subIdx: number;
  HandleSubTodo: {
    add: () => void;
    update: (e: any, subIdx: number) => void;
    delete: (subIdx: number) => void;
    handleDone: (subIdx: number) => void;
    checkIsOverThree: () => boolean;
  };
}

export const SubTodoEdit = ({ subTodo, subIdx, HandleSubTodo }: Props) => {
  return (
    <div>
      <input
        value={subTodo.content}
        onChange={(e) => HandleSubTodo.update(e, subIdx)}
      />
      <button onClick={() => HandleSubTodo.delete(subIdx)}>X</button>
    </div>
  );
};

//<input type="checkbox" checked={subTodo.done} onClick={() => HandleSubTodo.handleDone(subIdx)}/>
