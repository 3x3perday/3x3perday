"use client";
import React from "react";
import Modal from "../modal";
import { ModalProps } from "../util";
import styles from "./todoDelete.module.scss";

interface Props extends ModalProps {
  submit: () => void;
}

const TodoDeleteModal = (props: Props) => {
  const onSubmit = () => {
    props.setIsOpen(false);
    props.submit();
  };
  return (
    <Modal size="md" {...props}>
      <div className={styles.container}>
        <p>해당 Todo를 </p>
        <p>정말로 삭제하시겠습니까?</p>
        <div className={styles.btn_box}>
          <button className={styles.delete_btn} onClick={onSubmit}>
            삭제하기
          </button>
          <button
            className={styles.cancel_btn}
            onClick={() => props.setIsOpen(false)}
          >
            취소
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default TodoDeleteModal;
