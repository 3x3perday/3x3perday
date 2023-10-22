import { useEffect, useState } from "react";

// --- Draggable이 Droppable로 드래그 되었을 때 실행되는 이벤트

export const useDnD = () => {
  const [enabled, setEnabled] = useState(false);
  useEffect(() => {
    const animation = requestAnimationFrame(() => setEnabled(true));
    return () => {
      cancelAnimationFrame(animation);
      setEnabled(false);
    };
  }, []);
  if (!enabled) return null;
};
