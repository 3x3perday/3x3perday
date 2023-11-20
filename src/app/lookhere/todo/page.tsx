import React from "react";
import PostNew from "./PostNew";
import Link from "next/link";

const fetchData = async () => {
  const userId = "1234";
  const date = "2023-11-17";

  const res = await fetch(
    `http://localhost:3000/api/todo?userId=${userId}&date=${date}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const a = await res.json();
  console.log(a, "HIHIH");
  return a;
};

const SPage = async () => {
  const data = await fetchData();
  if (!data)
    return (
      <div>
        No DATA <PostNew />
      </div>
    );

  return (
    <div>
      <PostNew />
      <h1> TOTOS</h1>
      <h3>DATE : {data.date}</h3>
      {data.todos?.map((todo: any) => (
        <div key={todo._id}>
          <h1>MAIN :{todo.mainTodo.content}</h1>
          {todo.subTodos?.map((subTodo: any) => (
            <div key={subTodo._id}>
              <p>subTodo : {subTodo.content}</p>
              <p>{subTodo.done ? "YES" : "NO"}</p>
            </div>
          ))}
        </div>
      ))}
      <Link href={`/lookhere/todo/update`}>수정하기</Link>
    </div>
  );
};

export default SPage;
