import { TodoItem } from "@/types/todo";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import styles from "./todo.module.scss";
import FingerIcon from "@/components/Icon/FingerIcon";
import { TODO_COLOR } from "@/constants/Theme";

interface Props {
  // todo: TodoItem;
  sortedId: number;
  mainTodo: TodoItem["mainTodo"];
  HadnleMainTodo: { update: (e: any) => void };
}

export const MainTodoEdit = ({
  sortedId,
  mainTodo,
  HadnleMainTodo,
}: Props) => {
  const textareaRef = useRef(null);
  const FONT_SIZE = 35;

  const handleTextareaChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const textarea = textareaRef.current || {
      scrollHeight: 0,
      style: { height: "0px" },
    };

    textarea.style.height = `${FONT_SIZE}px`;
    textarea.style.height = `${textarea.scrollHeight}px`;

    if (150 < textarea.scrollHeight) return;

    HadnleMainTodo.update(event);
  };

  return (
    <div
      style={{
        backgroundColor: `${TODO_COLOR[sortedId]}`,
      }}
      className={styles.container}
    >
      <FingerIcon count={sortedId} isActive={true} />
      <textarea
        style={{
          overflow: "hidden",
          fontSize: `${FONT_SIZE}px`,
        }}
        ref={textareaRef}
        value={mainTodo.content}
        onChange={handleTextareaChange}
      />
    </div>
  );
};

//<input type="checkbox" checked={mainTodo.done}onClick={HadnleMainTodo.handleDone}/>;
