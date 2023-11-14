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

  const MainTodo = {
    handleValue: (e: any) => {
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

  const SubTodo = {
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

    handleValue: (e: any, subIdx: number) => {
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

  const deleteAll = async () => {
    if (!todo) return;
    setTodo({
      ...todo,
      mainTodo: new TodoBase(),
      subTodos: [],
    });
  };

  return (
    <main>
      <h1>{sortedId} 번 TODO</h1>
      <button onClick={onSubmit}>SAVE</button>
      <button onClick={deleteAll}>DELETE</button>
      {todo && (
        <div style={styles}>
          <div>
            <input
              type="checkbox"
              checked={todo.mainTodo.done}
              onClick={MainTodo.handleDone}
            />
            <input
              value={todo.mainTodo.content}
              onChange={MainTodo.handleValue}
            />
          </div>

          <div style={styles2}>
            {todo.subTodos.map((subTodo, subIdx) => (
              <div key={subIdx}>
                <input
                  type="checkbox"
                  checked={subTodo.done}
                  onClick={() => SubTodo.handleDone(subIdx)}
                />
                <input
                  value={subTodo.content}
                  onChange={(e) => SubTodo.handleValue(e, subIdx)}
                />
                <button onClick={() => SubTodo.delete(subIdx)}>X</button>
              </div>
            ))}
            {!SubTodo.checkIsOverThree() && (
              <button onClick={SubTodo.add}>+</button>
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
