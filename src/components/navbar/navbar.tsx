"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { css } from "@emotion/react";
import dayjs from "dayjs";

interface Props {
  date: string;
  setDate: React.Dispatch<React.SetStateAction<string>>;
  // todos: TodoPageModel[];
}

export default function Navbar({ date, setDate }: Props) {
  const [isToday, setIsToday] = useState(true);

  useEffect(() => {
    const today = dayjs().format("YYYY-MM-DD");
    if (date === today) return setIsToday(true);
    setIsToday(false);
  }, [date]);

  const goYesterday = () => {
    const yesterday = dayjs(date).subtract(1, "day").format("YYYY-MM-DD");
    setDate(yesterday);
  };
  const goToday = () => {
    const today = dayjs().format("YYYY-MM-DD");
    setDate(today);
  };

  return (
    <div css={styles}>
      {isToday && (
        <Image
          onClick={goYesterday}
          src="/icon/arrow_left.png"
          width={20}
          height={25}
          alt="arrow"
          className="arrow_left"
        />
      )}
      <div className="date">{date}</div>
      {!isToday && (
        <Image
          onClick={goToday}
          src="/icon/arrow_right.png"
          width={20}
          height={25}
          alt="arrow"
          className="arrow_right"
        />
      )}
    </div>
  );
}

const styles = css`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  height: 60px;
  background-color: #3a3a39;
  .arrow_left {
    cursor: pointer;
    position: absolute;
    left: 20px;
    top: 20px;
  }
  .arrow_right {
    cursor: pointer;
    position: absolute;
    right: 20px;
    top: 20px;
  }
  .date {
    border-bottom-color: #aaaaaa;
    border-bottom: solid 3px;
    font-size: 22px;
    font-weight: 800;
    color: #fff;
    width: 170px;
    height: 33px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
