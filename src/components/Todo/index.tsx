import { TodoModeProvider } from '@/context/TodoModeContext';
import { EmptyTodo } from '@/components/Todo/EmptyTodo';
import { SubTodo } from '@/components/Todo/SubTodo';
import { MainTodo } from '@/components/Todo/MainTodo';
import { Wrapper } from '@/components/Todo/Wrapper';
import { Toggle } from '@/components/Todo/Toggle';

export const Todo = {
  Provider: TodoModeProvider,
  Empty: EmptyTodo,
  Main: MainTodo,
  Sub: SubTodo,
  Wrapper,
  Toggle
}
