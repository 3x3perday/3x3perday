"use client";

import ModalModal from "./components/modalmodal";
import React, { useState } from "react";
import DNDPage from "./components/DNDPage";
import { css } from "@emotion/react";
import Navbar from "@/components/navbar/navbar";

const ModalPage = () => {
  // --- Draggable이 Droppable로 드래그 되었을 때 실행되는 이벤트
  const [date, setDate] = useState(new Date());

  return (
    <main>
      <div css={CSS}>
        <Navbar date={date} />
        <ModalModal />
        <DNDPage />
      </div>
    </main>
  );
};

const data = [
  {
    date: "2021-09-01",
    mainTodo: [
      {
        title: "title",
        isDone: false,
        subTodo: [
          {
            title: "subTitle",
            isDone: false,
          },
        ],
      },
    ],
  },
];

const CSS = css`
  background-color: #fff;
  width: 500px;
  height: 700px;
  padding: 30px;
  justify-content: center;
`;
export default ModalPage;
