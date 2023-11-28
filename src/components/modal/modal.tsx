import Image from "next/image";
import { ModalProps, MODAL_SIZE, modalType } from "./util";
import styles from "./modal.module.scss";

interface Props extends ModalProps {
  children: React.ReactNode;
  size?: modalType;
}

const Modal = (props: Props) => {
  const close = () => props.setIsOpen(false);

  return (
    <div
      className={styles.container}
      style={{
        width: MODAL_SIZE[props.size || "md"],
      }}
    >
      <Image
        onClick={close}
        src="/icon/close.png"
        className={styles.close_icon}
        width={20}
        height={20}
        alt="close_icon"
      />
      {props.children}
    </div>
  );
};

export default Modal;
