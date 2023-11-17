"use client";
import { AppBar } from "@/components/navbar/AppBar";
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
  const searchParam = useSearchParams();
  const router = useRouter();

  const sortedId = Number(searchParam.get("sortedId")) || 0;
  const date = params.date;

  const [originTodoResponse, setOriginTodoResponse] = useState<TodoResponse>();

  const [todo, setTodo] = useState<TodoItem>();

  const getInitData = async () => {
    const userId = localStorage.getItem("userId") || "1234";

    const _data = await fetchData(userId, date);
    if (!_data) return;
    setOriginTodoResponse(_data);
    setTodo(_data.todos[sortedId]);
  };

  useEffect(() => {
    getInitData();
  }, []);

  const HadnleMainTodo = {
    update: (e: any) => {
      if (!todo) return;
      setTodo({
        ...todo,
        mainTodo: {
          ...todo.mainTodo,
          content: e.target.value,
        },
      });
    },
    handleDone: () => {
      if (!todo) return;
      setTodo({
        ...todo,
        mainTodo: {
          ...todo.mainTodo,
          done: !todo.mainTodo.done,
        },
      });
    },
  };

  const HandleSubTodo = {
    add: () => {
      if (!todo) return;

      if (todo.subTodos.length >= 3) return;

      let newSubTodos = [...todo.subTodos];
      newSubTodos.push(new TodoBase());

      setTodo({
        ...todo,
        subTodos: newSubTodos,
      });
    },

    update: (e: any, subIdx: number) => {
      if (!todo) return;

      let newSubTodos = [...todo.subTodos];
      newSubTodos[subIdx].content = e.target.value;
      setTodo({
        ...todo,
        subTodos: newSubTodos,
      });
    },
    delete: (subIdx: number) => {
      if (!todo) return;

      let newSubTodos = [...todo.subTodos];
      newSubTodos.splice(subIdx, 1);

      setTodo({
        ...todo,
        subTodos: newSubTodos,
      });
    },

    handleDone: (subIdx: number) => {
      if (!todo) return;

      let newSubTodos = [...todo.subTodos];
      newSubTodos[subIdx].done = !newSubTodos[subIdx].done;
      setTodo({
        ...todo,
        subTodos: newSubTodos,
      });
    },

    checkIsOverThree: () => {
      if (!todo) return false;
      return todo.subTodos.length >= 3;
    },
  };

  const onSubmit = async () => {
    const data = {
      originTodoResponse: originTodoResponse,
      sortedId: sortedId,
      newTodo: todo,
    };

    const res = await http.patch(`/api/todo/`, data);
    const res2 = await res.json();
    alert(res2.message);
  };

  const deleteAll = async () => {
    if (!todo) return;
    setTodo({
      ...todo,
      mainTodo: new TodoBase(),
      subTodos: [],
    });
  };

  const goBack = () => router.push(`/todo`);
  return (
    <main>
      <AppBar />
      <hr />
      <h1>{sortedId} 번 TODO</h1>
      <button onClick={goBack}>BACK</button>
      <button onClick={onSubmit}>SAVE</button>
      <button onClick={deleteAll}>DELETE</button>
      {todo && (
        <div style={styles}>
          <div>
            <input
              type="checkbox"
              checked={todo.mainTodo.done}
              onClick={HadnleMainTodo.handleDone}
            />
            <input
              value={todo.mainTodo.content}
              onChange={HadnleMainTodo.update}
            />
          </div>

          <div style={styles2}>
            {todo.subTodos.map((subTodo, subIdx) => (
              <div key={subIdx}>
                <input
                  type="checkbox"
                  checked={subTodo.done}
                  onClick={() => HandleSubTodo.handleDone(subIdx)}
                />
                <input
                  value={subTodo.content}
                  onChange={(e) => HandleSubTodo.update(e, subIdx)}
                />
                <button onClick={() => HandleSubTodo.delete(subIdx)}>X</button>
              </div>
            ))}
            {!HandleSubTodo.checkIsOverThree() && (
              <button onClick={HandleSubTodo.add}>+</button>
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
  backgroundColor: "yellowgreen",
  marginTop: "10px",
  padding: "10px",
};
