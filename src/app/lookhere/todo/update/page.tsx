import React from "react";

const fetchData = async () => {
  const userId = "1234";
  const DATE = "2023-11-12";

  const res = await fetch(
    `http://localhost:3000/api/todo/?userId=${userId}&date=${DATE}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const a = await res.json();
  console.log(a, "HI");
  return a;
};

const SPage = async () => {
  const data = await fetchData();
  console.log(data, "DDHDH");

  if (!data) return <div>No DATA</div>;

  return (
    <div>
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
    </div>
  );
};

export default SPage;
