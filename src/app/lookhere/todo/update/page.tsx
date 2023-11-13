"use client";
import { useEffect, useState } from "react";
import { TodoSchema } from "@/types/todo";
import Link from "next/link";

const fetchData = async () => {
  const userId = "1234";
  const DATE = "2023-11-15";
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
  return a;
};

const SPage = () => {
  const [data, setData] = useState<TodoSchema>();

  useEffect(() => {
    (async () => {
      const _data = await fetchData();
      console.log(_data);
      setData(_data);
    })();
  }, []);

  if (!data) return <div>No DATA</div>;

  const onChange = (e: any, idx: number) => {
    console.log(e.target.value);
    const newData = { ...data };
    newData.todos[idx].mainTodo.content = e.target.value;
    setData(newData);
  };

  const onSubmit = () => {
    const userId = "1234";
    const date = "2023-11-15";

    (async () => {
      const res = await fetch(
        `http://localhost:3000/api/todo/?userId=${userId}?date=${date}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ data: data }),
        }
      );

      const res2 = await res.json();
      alert(res2.message);
    })();
  };
  const handleCheck = (e: any, idx: number) => {
    const newData = { ...data };
    newData.todos[idx].mainTodo.done = e.target.checked;
    setData(newData);
  };
  return (
    <div>
      <h1> TOTOS</h1>
      <h3>DATE : {data.date}</h3>

      {data.todos?.map((todo: any, idx: number) => (
        <div key={todo._id}>
          <h1>
            MAIN :<div></div>
            <input
              value={todo.mainTodo.content}
              onChange={(e) => onChange(e, idx)}
            />
            <input
              type="checkbox"
              checked={todo.mainTodo.done}
              onChange={(e) => handleCheck(e, idx)}
            />
          </h1>
          {todo.subTodos?.map((subTodo: any) => (
            <div key={subTodo._id}>
              <p>subTodo : {subTodo.content}</p>
              <p>{subTodo.done ? "YES" : "NO"}</p>
            </div>
          ))}
        </div>
      ))}

      <button onClick={onSubmit}>SUBMIT</button>

      <Link href={`/lookhere/todo`}>뒤로가기</Link>
    </div>
  );
};

export default SPage;
