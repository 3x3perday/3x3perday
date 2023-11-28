'use client';
import styles from "./DateNavBar.module.scss";
import Link from "next/link";
import { Icon } from "@/components/Icon/Icon";

interface Props {
  date: string;
  save: () => void;
}

export const DateNavBarEdit = ({ date, save }: Props) => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper_edit}>
        <Link href={`/todo`} className={styles.leftArrow_edit}>
          <Icon name="date-arrow" width="20px" height="20px" />
        </Link>
        <p>{date}</p>
        <button className={styles.save_button} onClick={save}>완료</button>
      </div>
    </div>
  );
};
