"use client";

import { css } from "@emotion/react";
import Box from "./Box";

import ModalModal from "./modalmodal";

// React 관련 요소
import React, { useEffect, useState } from "react";
// 드래그 요소
import {
  DragDropContext,
  Draggable,
  DropResult,
  Droppable,
} from "@hello-pangea/dnd";

const ModalPage = () => {
  const [items, setItems] = useState(data);

  // --- Draggable이 Droppable로 드래그 되었을 때 실행되는 이벤트
  const onDragEnd = ({ source, destination }: DropResult) => {
    console.log(">>> source", source);
    console.log(">>> destination", destination);
    if (!destination) return;
    const _items = JSON.parse(JSON.stringify(items)) as typeof items;
    
    const [targetItem] = _items.splice(source.index, 1);
    
    _items.splice(destination.index, 0, targetItem);
    
    setItems(_items);
  };

  // --- requestAnimationFrame 초기화
  const [enabled, setEnabled] = useState(false);
  useEffect(() => {
    const animation = requestAnimationFrame(() => setEnabled(true));
    return () => {
      cancelAnimationFrame(animation);
      setEnabled(false);
    };
  }, []);
  if (!enabled) return null;

  // --------------------------------------------

  return (
    <div>
      <ModalModal />
      <div css={CSS}>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {items.map((item, index) => (
                  <Draggable
                    key={item.id}
                    draggableId={String(item.id)}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <Box item={item} />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  );
};

const data = [
  { id: 0, name: "김철수", age: 26 },
  { id: 1, name: "홍길동", age: 20 },
  { id: 2, name: "길동홍", age: 24 },
  { id: 3, name: "동홍길", age: 25 },
];
const CSS = css`
  .box {
    width: 100px;
    height: 100px;
    margin: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export default ModalPage;
