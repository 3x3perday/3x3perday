"use client";

import CircleLoader from "@/components/loader/circle-loader";
import Navbar from "@/components/navbar/navbar";
import SubNavbar from "@/components/navbar/sub_navbar";
import { TodoPageModel, mockTodoData } from "@/types/todo";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const AchievePage = () => {
  const [isReady, setIsReady] = useState(false);
  const [count, setCount] = useState(0);
  useEffect(() => {
    let _todos = localStorage.getItem("todos") || JSON.stringify(mockTodoData);
    const todos = JSON.parse(_todos) as TodoPageModel[];

    let _count = 0;
    todos.map((data) => {
      data.todos.map((todo) => {
        todo.mainTodo.done && _count++;

        todo.subTodos.map((subTodo) => {
          subTodo.done && _count++;
        });
      });
    });
    setCount(_count);
    setTimeout(() => setIsReady(true), 1000);
  }, []);

  const getSize = (count: number) => {
    const length = String(count).length;
    if (length == 1) return 500;
    if (length == 2) return 300;
    if (length == 3) return 200;
    else return 100;
  };

  return (
    <main>
      <SubNavbar />
      <Wrapper>
        {isReady ? (
          <>
            <div className="count_sub">You did</div>
            <div className="count" css={countCSS(getSize(count))}>
              {count}
            </div>
            <div className="count_sub border-bottom">Things</div>
          </>
        ) : (
          <div className="loader">
            <CircleLoader />
          </div>
        )}
      </Wrapper>
    </main>
  );
};

const Wrapper = styled.div`
  background-color: #292929;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  .count {
    width: 100%;
    height: 500px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .count_sub {
    width: 80%;
    height: 140px;
    display: flex;
    justify-content: center;
    padding-top: 50px;
    font-size: 80px;
    font-weight: 900;
    color: #eb8dd6;
  }
  .border-bottom {
    border-bottom: 20px solid #eb8dd6;
  }
  .loader {
    padding-top: 300px;
  }
`;
const countCSS = (length: number) => css`
  color: #eb8dd6;
  font-size: ${length}px;
  font-weight: 900;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export default AchievePage;
