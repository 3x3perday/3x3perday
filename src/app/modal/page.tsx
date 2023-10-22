"use client";

import ModalModal from "./components/modalmodal";
import React from "react";
import DNDPage from "./components/DNDPage";
import { css } from "@emotion/react";

const ModalPage = () => {
  // --- Draggable이 Droppable로 드래그 되었을 때 실행되는 이벤트

  return (
    <main>
      <div css={CSS}>
        <ModalModal />
        <DNDPage />
      </div>
    </main>
  );
};

const CSS = css`
  background-color: #fff;
  width: 500px;
  height: 700px;
  padding: 30px;
  justify-content: center;
`;
export default ModalPage;
