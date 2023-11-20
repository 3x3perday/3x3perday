"use client";
import React from "react";

const PostNew = () => {
  const userId = "1234";
  const date = "2023-11-17";
  const postNewTodo = () => {
    (async () => {
      const res = await fetch(
        `http://localhost:3000/api/todo?userId=${userId}&date=${date}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          // body: JSON.stringify({ userId: "1234" }),
        }
      );

      const data = await res.json();
      alert(data.message);
    })();
  };

  return <button onClick={postNewTodo}>오늘 날짜로 새거 만들기</button>;
};

export default PostNew;
