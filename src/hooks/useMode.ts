import { TodoMode } from '@/context/TodoModeContext';
import { useState } from 'react';

export const useMode = (initialMode: TodoMode['mode']):TodoMode => {
  const [mode, setMode] = useState<TodoMode['mode']>(initialMode);
  const updateTodoMode:TodoMode['setMode'] = (updateMode) => {
    setMode(updateMode);
  }
  return {
    mode: mode,
    setMode: updateTodoMode
  }
}
