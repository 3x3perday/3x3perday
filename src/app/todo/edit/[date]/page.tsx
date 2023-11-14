"use client";
import { TodoBase, TodoItem, TodoResponse } from "@/types/todo";
import { http } from "@/utils/http";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

interface Params {
  date: string; // 2023-11-15
}

const fetchData = async (userId: string, date: string) => {
  const res = await http.get(`/api/todo/?userId=${userId}&date=${date}`);
  if (res.status === 200) {
    return (await res.json()) as TodoResponse;
  }
};

const TodoUpdatePageByIndex = ({ params }: { params: Params }) => {
  const router = useSearchParams();

  const userId = localStorage.getItem("userId") || "1234";

  const sortedId = Number(router.get("sortedId")) || 0;
  const date = params.date;

  const [originTodoResponse, setOriginTodoResponse] = useState<TodoResponse>();

  const [todo, setTodo] = useState<TodoItem>();

  const getInitData = async () => {
    const _data = await fetchData(userId, date);
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

  const addSubTodo = () => {
    if (!todo) return;

    if (todo.subTodos.length >= 3) return;

    let newSubTodos = [...todo.subTodos];
    newSubTodos.push(new TodoBase());

    setTodo({
      ...todo,
      subTodos: newSubTodos,
    });
  };

  const deleteSubTodo = (idx: number) => {
    if (!todo) return;

    let newSubTodos = [...todo.subTodos];
    newSubTodos.splice(idx, 1);

    setTodo({
      ...todo,
      subTodos: newSubTodos,
    });
  };

  const checkIsOverThree = () => {
    if (!todo) return false;
    return todo.subTodos.length >= 3;
  };

  const onSubmit = async () => {
    const data = {
      todo: originTodoResponse,
      sortedId: sortedId,
      newTodo: todo,
    };

    const res = await http.patch(
      `/api/todo/?userId=${userId}?date=${date}`,
      data
    );
    const res2 = await res.json();
    alert(res2.message);
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
                <button onClick={() => deleteSubTodo(idx)}>X</button>
              </div>
            ))}
            {!checkIsOverThree() && <button onClick={addSubTodo}>+</button>}
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
  backgroundColor: "yellowgreen",
  marginTop: "10px",
  padding: "10px",
};
