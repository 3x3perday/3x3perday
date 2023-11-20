/* eslint-disable react/display-name */
import { TODO_COLOR } from "@/constants/Theme";
import { TodoBase } from "@/types/todo";
import React, { ButtonHTMLAttributes, ReactElement } from "react";
import styles from "./todo.module.scss";
import { Icon } from "@/components/Icon/Icon";

const SubTodoEdit = ({ children }: { children: React.ReactNode }) => {
  return <div className={styles.subTodoContainer}>{children}</div>;
};

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

SubTodoEdit.Item = ({ subTodo, subIdx, HandleSubTodo }: Props) => {
  return (
    <div className={styles.subTodoItem}>
      <input
        value={subTodo.content}
        onChange={(e) => HandleSubTodo.update(e, subIdx)}
      />
      <button className="deleteBtn" onClick={() => HandleSubTodo.delete(subIdx)}>X</button>
    </div>
  );
};
//<input type="checkbox" checked={subTodo.done} onClick={() => HandleSubTodo.handleDone(subIdx)}/>

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  sortedId: number;
}
SubTodoEdit.AddButton = (props: ButtonProps) => {
  return (
    <div className={styles.subTodoItem}>
      <button
        style={{
          backgroundColor: `${TODO_COLOR[props.sortedId]}`,
        }}
        className={styles.addBtn}
        onClick={props.onClick}
      >
        <Icon name="plus" className={styles.plusIcon} />
      </button>
    </div>
  );
};

export default SubTodoEdit;
