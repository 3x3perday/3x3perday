import React, { useEffect, useState } from "react";
import Image from "next/image";
import { css } from "@emotion/react";
import { dateToStr } from "@/utils/date";
import { TodoModel } from "@/types/todo";

interface Props {
  date: Date;
  todos: TodoModel[];
}

export default function Navbar(props: Props) {
  return (
    <div css={styles}>
      <div>
        <Image
          src="/arrow.svg"
          width={20}
          height={25}
          alt="arrow"
          className="arrow"
        />
      </div>
      <div className="date">{dateToStr(props.date)}</div>
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
  .arrow {
    cursor: pointer;
    position: absolute;
    left: 20px;
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
