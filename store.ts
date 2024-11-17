import { create } from "zustand";

interface TimerState {
  timer: boolean;
  showTimer: () => void;
  hideTimer: () => void;
}
interface TodoListState {
  todoList: boolean;
  showTodoList: () => void;
  hideTodoList: () => void;
}

export const useTimer = create<TimerState>((set) => ({
  timer: false,
  showTimer: () => set((state) => ({ timer: true })),
  hideTimer: () => set((state) => ({ timer: false })),
}));

export const useTodoList = create<TodoListState>((set) => ({
  todoList: false,
  showTodoList: () => set((state) => ({ todoList: true })),
  hideTodoList: () => set((state) => ({ todoList: false })),
}));
