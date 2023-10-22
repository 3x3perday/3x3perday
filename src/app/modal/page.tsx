"use client";
import React from "react";
import ModalTest from "./ModalTest";

const ModalPage = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div>
      <h1>HELLO</h1>
      <button onClick={() => setIsOpen(!isOpen)}>DODNG</button>
      {isOpen && <ModalTest isOpen={isOpen} setIsOpen={setIsOpen} />}
    </div>
  );
};

export default ModalPage;
