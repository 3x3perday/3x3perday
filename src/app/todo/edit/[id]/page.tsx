"use client";
import { TodoBase, TodoItem, TodoResponse } from "@/types/todo";
import { http } from "@/utils/http";
import React, { useEffect, useState } from "react";

interface Params {
  id: string;
}

const fetchData = async () => {
  const USER_ID = "1234";
  const DATE = "2023-11-15";

  const res = await http.get(`/api/todo/?userId=${USER_ID}&date=${DATE}`);
  if (res.status === 200) {
    return (await res.json()) as TodoResponse;
  }
};

const TodoUpdatePageByIndex = ({ params }: { params: Params }) => {
  const sortedId = Number(params.id);
  const [originTodoResponse, setOriginTodoResponse] = useState<TodoResponse>();

  const [todo, setTodo] = useState<TodoItem>();

  const getInitData = async () => {
    const _data = await fetchData();
    if (!_data) return;
    setOriginTodoResponse(_data);
    setTodo(_data.todos[sortedId]);
  };

  useEffect(() => {
    getInitData();
  }, []);

  const handleMainTodo = (e: any) => {
    if (!todo) return;
    setTodo({
      ...todo,
      mainTodo: {
        ...todo.mainTodo,
        content: e.target.value,
      },
    });
  };

  const handleSubTodo = (e: any, idx: number, subIdx: number) => {
    if (!todo) return;

    let newSubTodos = [...todo.subTodos];
    newSubTodos[subIdx].content = e.target.value;
    setTodo({
      ...todo,
      subTodos: newSubTodos,
    });
  };

  const handleAddSubTodo = (todoSortId: number) => {
    if (!todo) return;

    if (todo.subTodos.length >= 3) return;

    let newSubTodos = [...todo.subTodos];
    newSubTodos.push(new TodoBase());

    setTodo({
      ...todo,
      subTodos: newSubTodos,
    });
  };

  const checkIsOverThree = () => {
    if (!todo) return false;
    return todo.subTodos.length >= 3;
  };

  const onSubmit = () => {
    const userId = "1234";
    const date = "2023-11-15";

    (async () => {
      const res = await fetch(`/api/todo/?userId=${userId}?date=${date}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          todo: originTodoResponse,
          sortedId: sortedId,
          newTodo: todo,
        }),
      });

      const res2 = await res.json();
      alert(res2.message);
    })();
  };

  return (
    <main>
      <h1>{sortedId} 번 TODO</h1>
      <button onClick={onSubmit}>SAVE</button>
      {todo && (
        <div style={styles}>
          <div>
            MAIN :{" "}
            <input value={todo.mainTodo.content} onChange={handleMainTodo} />
          </div>

          <div style={styles2}>
            {todo.subTodos.map((subTodo, idx) => (
              <div key={idx}>
                <input
                  value={subTodo.content}
                  onChange={(e) => handleSubTodo(e, sortedId, idx)}
                />
              </div>
            ))}
            {!checkIsOverThree() && (
              <button onClick={() => handleAddSubTodo(sortedId)}>+</button>
            )}
          </div>
        </div>
      )}
    </main>
  );
};

export default TodoUpdatePageByIndex;

const styles = {
  minHeight: "100px",
  backgroundColor: "skyblue",
  margin: "20px",
};
const styles2 = {
  backgroundColor: "tomato",
  marginTop: "10px",
  padding: "10px",
};
