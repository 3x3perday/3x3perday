'use client'
import { createContext, ReactNode } from 'react';
import { useMode } from '@/hooks/useMode';

export interface TodoMode {
  mode: 'read' | 'edit';
  setMode: (updateMode: TodoMode['mode']) => void;
}

export const DEFAULT_VALUE:TodoMode = {
  mode: 'read',
  setMode: () => {}
};
export const TodoModeContext = createContext<TodoMode>(DEFAULT_VALUE)

export const TodoModeProvider = ({mode, children}:{mode:TodoMode['mode'], children: ReactNode}) => {
  const value = useMode(mode);
  return (
    <TodoModeContext.Provider value={value}>
      {children}
    </TodoModeContext.Provider>
  )
}
