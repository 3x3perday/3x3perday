"use client";
import { TodoResponse } from "@/types/todo";
import { http } from "@/utils/http";
import React, { useEffect, useState } from "react";

const fetchData = async () => {
  const USER_ID = "1234";
  const DATE = "2023-11-15";

  const res = await http.get(`/api/todo/?userId=${USER_ID}&date=${DATE}`);
  if (res.status === 200) {
    return (await res.json()) as TodoResponse;
  }
};

const TodoUpdatePage = () => {
  const [data, setData] = useState<TodoResponse>();

  const getInitData = async () => {
    const _data = await fetchData();
    setData(_data);
  };

  useEffect(() => {
    getInitData();
  }, []);

  const handleMainTodo = (e: any, idx: number) => {
    if (!data) return;

    const newData = { ...data };
    newData.todos[idx].mainTodo.content = e.target.value;

    setData(newData);
  };

  const handleSubTodo = (e: any, idx: number, subIdx: number) => {
    if (!data) return;

    const newData = { ...data };
    newData.todos[idx].subTodos[subIdx].content = e.target.value;

    setData(newData);
  };

  const handleAddSubTodo = (todoSortId: number) => {
    if (!data) return;

    const newData = { ...data };
    const targetTodo = newData.todos.find(
      (todo) => todo.sortedId === todoSortId
    );

    if (!targetTodo) return;

    if (targetTodo.subTodos.length >= 3) return;

    targetTodo.subTodos.push({
      content: "",
      done: false,
    });

    setData(newData);
  };

  return (
    <main>
      {data &&
        data.todos.map((todoItem) => (
          <div style={styles} key={todoItem.sortedId}>
            <div>
              MAIN :{" "}
              <input
                value={todoItem.mainTodo.content}
                onChange={(e) => handleMainTodo(e, todoItem.sortedId)}
              />
            </div>

            <div style={styles2}>
              <div>SUB!!</div>
              {todoItem.subTodos.map((subTodo, idx) => (
                <div key={idx}>
                  <input
                    value={subTodo.content}
                    onChange={(e) => handleSubTodo(e, todoItem.sortedId, idx)}
                  />
                </div>
              ))}
              <button onClick={() => handleAddSubTodo(todoItem.sortedId)}>
                +
              </button>
            </div>
          </div>
        ))}
      <button>SAVE</button>
    </main>
  );
};

export default TodoUpdatePage;

const styles = {
  minHeight: "100px",
  backgroundColor: "skyblue",
  margin: "20px",
};
const styles2 = {
  backgroundColor: "tomato",
  marginTop: "10px",
};
