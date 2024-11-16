import { create } from "zustand";

interface TimerState {
  timer: boolean;
  showTimer: () => void;
}
interface TodoListState {
  todoList: boolean;
  showTodoList: () => void;
}

export const useTimer = create<TimerState>((set) => ({
  timer: false,
  showTimer: () => set((state) => ({ timer: true })),
}));

export const useTodoList = create<TodoListState>((set) => ({
  todoList: false,
  showTodoList: () => set((state) => ({ todoList: true })),
}));
