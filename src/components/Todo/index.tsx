import { TodoModeProvider } from '@/context/TodoModeContext';
import { EmptyTodo } from '@/components/Todo/EmptyTodo';
import { SubTodo } from '@/components/Todo/SubTodo';
import { MainTodo } from '@/components/Todo/MainTodo';

export const Todo = {
  Provider: TodoModeProvider,
  Empty: EmptyTodo,
  Main: MainTodo,
  Sub: SubTodo,
}
