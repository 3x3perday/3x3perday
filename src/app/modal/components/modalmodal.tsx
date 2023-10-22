import React from "react";
import ModalTest from "./ModalTest";

const ModalModal = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div>
      <button onClick={() => setIsOpen(!isOpen)}>DODNG</button>
      {isOpen && <ModalTest isOpen={isOpen} setIsOpen={setIsOpen} />}
    </div>
  );
};

export default ModalModal;
