import React, { ButtonHTMLAttributes } from "react";
import styles from "./todo.module.scss";
import { TODO_COLOR } from "@/constants/Theme";
import { ICON_MAP, Icon } from "@/components/Icon/Icon";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  sortedId: number;
}
export const AddButton = (props: Props) => {
  return (
    <button
      style={{
        backgroundColor: `${TODO_COLOR[props.sortedId]}`,
      }}
      className={styles.add_btn}
      {...props}
    >
      <Icon name="plus" className={styles.plusIcon} />
    </button>
  );
};
