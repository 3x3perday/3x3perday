"use client";
import React from "react";

const SubmitButton = () => {
  const onSubmit = async () => {
    const res = await fetch("http://localhost:3000/api/todo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: "1234" }),
    });

    const data = await res.json();
    console.log(data);
  };
  return <button onClick={() => onSubmit()}>SubmitButton</button>;
};

export default SubmitButton;
