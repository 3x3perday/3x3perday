import { css } from "@emotion/react";
import React from "react";

interface Props {
  item: { id: number; name: string; age: number };
}

const Box = (props: Props) => {
  const { item } = props;
  return (
    <div css={boxCSS(item.id)} className={`box box${item.id}`} {...props}>
      {item.name} {item.age}
    </div>
  );
};

export default Box;

const color = ["#f57474", "green", "blue", "yellow", "pink", "skyblue"];
const boxCSS = (index: number) => css`
  &.box${index} {
    background-color: ${color[index]};
  }
`;
