"use client";
import React from "react";
import Modal from "../modal";
import { ModalProps } from "../util";
import { css } from "@emotion/react";

interface Props extends ModalProps {
  submit: () => void;
}

const TodoDeleteModal = (props: Props) => {
  return (
    <Modal size="md" {...props}>
      <div css={CSS}>
        <p>해당 Todo를 </p>
        <p>정말로 삭제하시겠습니까?</p>
        <div className="btn_box">
          <button className="del_btn" onClick={() => props.submit()}>
            삭제하기
          </button>
          <button className="can_btn" onClick={() => props.setIsOpen(false)}>
            취소
          </button>
        </div>
      </div>
    </Modal>
  );
};
const CSS = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 200px;
  p {
    line-height: 30px;
  }
  .btn_box {
    display: flex;
    align-items: center;
    justify-content: space-around;
    margin-top: 10px;
    width: 100%;
    margin-top: 20px;
  }
  button {
    width: 100px;
    height: 30px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  .del_btn {
    background-color: #ff0000;
    color: #ffffff;
  }

  .can_btn {
    background-color: #eeeeee;
    color: #000000;
  }
`;
export default TodoDeleteModal;
