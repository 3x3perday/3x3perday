import { css } from "@emotion/react";
import { DraggableProvided } from "@hello-pangea/dnd";
import React from "react";

interface Props {
  item: { id: number; name: string; age: number };
  provided: DraggableProvided;
}

const Box = (props: Props) => {
  const { item, provided } = props;
  return (
    <div css={boxCSS(item.id)} className={`box box${item.id}`} {...props}>
      {item.name} {item.age}
      <div css={buttonCSS}>
        <div {...provided.dragHandleProps}>귀</div>
      </div>
    </div>
  );
};

export default Box;

const color = ["#f57474", "green", "blue", "yellow", "pink", "skyblue"];

const boxCSS = (index: number) => css`
  &.box${index} {
    background-color: ${color[index]};
  }
  &.box {
    width: 100px;
    height: 100px;
    margin: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
  }
`;

const buttonCSS = css`
  position: absolute;
  top: 0;
  right: -30px;
  width: 30px;
  background-color: #38e42f;
`;
