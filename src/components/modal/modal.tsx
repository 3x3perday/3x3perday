"use client";
import Image from "next/image";
import { ModalProps, MODAL_SIZE, modalType } from "./util";
import { css } from "@emotion/react";

interface Props extends ModalProps {
  children: React.ReactNode;
  size?: modalType;
}

const Modal = (props: Props) => {
  const close = () => props.setIsOpen(false);

  return (
    <div css={modalCSS(props.size || "md")}>
      <Image
        onClick={close}
        src="/icon/close.png"
        css={closeIconCSS}
        width={20}
        height={20}
        alt="close_icon"
      />
      {props.children}
    </div>
  );
};

const modalCSS = (size: modalType) => css`
  width: ${MODAL_SIZE[size]}px;
  height: auto;
  min-height: 200px;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const closeIconCSS = css`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  filter: invert(0.5);
`;
export default Modal;
