"use client";

import { css } from "@emotion/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const MainPage = () => {
  const router = useRouter();
  useEffect(() => {
    setTimeout(() => {
      router.push("/todotest");
    }, 3000);
  }, []);
  return (
    <main css={mainCSS}>
      <div className="left_top">
        <Image
          src={"/image/3perday.png"}
          width={180}
          height={180}
          alt="3perday"
        />
      </div>
      <div className="right_bot">
        <Image
          src={"/image/3todo.png"}
          width={100}
          height={100}
          alt="3perday"
        />
      </div>
    </main>
  );
};
const mainCSS = css`
  height: 100vh;
  background-color: #eb8dd6;
  position: relative;

  .left_top {
    position: absolute;
    top: 100px;
    left: 20px;
  }
  .right_bot {
    position: absolute;
    bottom: 10px;
    right: 10px;
  }
`;

export default MainPage;
