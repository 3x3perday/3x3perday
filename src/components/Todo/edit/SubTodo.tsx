/* eslint-disable react/display-name */
import { TODO_COLOR } from "@/constants/Theme";
import { TodoBase } from "@/types/todo";
import React, { ButtonHTMLAttributes, ReactElement } from "react";
import styles from "./Todo2.module.scss";
import { Icon } from "@/components/Icon/Icon";
import NumberIcon from "@/components/Icon/NumberIcon";

const SubTodoEdit = ({ children }: { children: React.ReactNode }) => {
  return <div className={styles.subTodoContainer}>{children}</div>;
};

interface Props {
  subTodo: TodoBase;
  subIdx: number;
  sortedId: number;
  HandleSubTodo: {
    add: () => void;
    update: (e: any, subIdx: number) => void;
    delete: (subIdx: number) => void;
    handleDone: (subIdx: number) => void;
    checkIsOverThree: () => boolean;
  };
}

SubTodoEdit.Item = ({ subTodo, subIdx, HandleSubTodo, sortedId }: Props) => {
  return (
    <div
      className={styles.subTodoItem}
      style={{
        backgroundColor: `${TODO_COLOR[sortedId]}`,
      }}
    >
      <NumberIcon count={subIdx} isActive />
      <input
        value={subTodo.content}
        onChange={(e) => HandleSubTodo.update(e, subIdx)}
      />
      <button
        className={styles.deleteBtn}
        onClick={() => HandleSubTodo.delete(subIdx)}
      >
        X
      </button>
    </div>
  );
};
//<input type="checkbox" checked={subTodo.done} onClick={() => HandleSubTodo.handleDone(subIdx)}/>

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  sortedId: number;
}
SubTodoEdit.AddButton = (props: ButtonProps) => {
  return (
    <div
      className={styles.subTodoItem}
      style={{
        padding: "0",
        width: "320px",
      }}
    >
      <div
        style={{
          backgroundColor: `${TODO_COLOR[props.sortedId]}`,
        }}
        className={styles.addButtonItem}
      >
        <button className={styles.addBtn} onClick={props.onClick}>
          <Icon name="plus" className={styles.plusIcon} />
        </button>
      </div>
    </div>
  );
};

export default SubTodoEdit;
