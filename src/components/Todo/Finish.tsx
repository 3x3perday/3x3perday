import { css } from "@emotion/react";
import Image from "next/image";
import React from "react";

const Finish = () => {
  return (
    <>
      <div css={CSS}>
        <Image
          src={"/image/popper.gif"}
          width={500}
          height={400}
          alt="3perday"
        />
      </div>
      <div css={CSS2}>
        <Image
          src={"/image/popper.gif"}
          width={500}
          height={400}
          alt="3perday"
        />
      </div>
    </>
  );
};

const CSS = css`
  position: absolute;
  top: 50px;
`;
const CSS2 = css`
  position: absolute;
  top: 400px;
`;

export default Finish;
