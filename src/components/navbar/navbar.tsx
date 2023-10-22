import React, { useEffect, useState } from "react";
import Image from "next/image";
import { css } from "@emotion/react";
import { dateToStr } from "@/utils/date";

type propsType = {};

export default function Navbar(props: propsType) {
  const [nowDate, setNowDate] = useState(new Date());

  useEffect(() => {}, []);

  return (
    <div
      css={css`
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: relative;
      `}
    >
      <Image
        css={css`
          flex: 0 0 auto;
        `}
        src="/arrow.svg"
        width={25}
        height={50}
        alt="arrow"
      />

      <div
        css={css`
          border-bottom-color: #aaaaaa;
          border-bottom: solid 3px;
          font-size: 22px;
          font-weight: 800;
          color: #a5a5a5;
          letter-spacing: 0.2px;
          width: 199px;
          height: 33px;
          text-align: center;
          position: absolute;
          left: 50%;
          translate: -50%;
        `}
      >
        {dateToStr(nowDate)}
      </div>
      <div
        css={css`
          flex: 1;
        `}
      />
    </div>
  );
}
