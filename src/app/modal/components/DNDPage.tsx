import React, { useState } from "react";
import {
  DragDropContext,
  Draggable,
  DropResult,
  Droppable,
} from "@hello-pangea/dnd";
import { useDnD } from "@/utils/dnd/dnd";
import Box from "./Box";

const DNDPage = () => {
  const [items, setItems] = useState(data);
  useDnD();

  const onDragEnd = ({ source, destination }: DropResult) => {
    if (!destination) return;
    const _items = JSON.parse(JSON.stringify(items)) as typeof items;

    const [targetItem] = _items.splice(source.index, 1);

    _items.splice(destination.index, 0, targetItem);

    setItems(_items);
  };

  return (
    <div>
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
                    <div ref={provided.innerRef} {...provided.draggableProps}>
                      <Box provided={provided} item={item} />
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
  );
};

const data = [
  { id: 0, name: "김철수", age: 26 },
  { id: 1, name: "홍길동", age: 20 },
  { id: 2, name: "길동홍", age: 24 },
  { id: 3, name: "동홍길", age: 25 },
];

export default DNDPage;
