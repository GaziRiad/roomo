import { create } from "zustand";

interface Note {
  id: number;
  content: string;
}

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

interface StickyNotesState {
  notes: Note[];
  count: number;
  addNote: (content: string) => void;
  removeNote: (id: number) => void;
  editeNote: (id: number, content: string) => void;
}

export const useTimer = create<TimerState>((set) => ({
  timer: false,
  showTimer: () => set(() => ({ timer: true })),
  hideTimer: () => set(() => ({ timer: false })),
}));

export const useTodoList = create<TodoListState>((set) => ({
  todoList: false,
  showTodoList: () => set(() => ({ todoList: true })),
  hideTodoList: () => set(() => ({ todoList: false })),
}));

export const useStickyNotes = create<StickyNotesState>((set) => ({
  notes: [],
  count: 0,
  addNote: (content) => {
    set((state) => ({
      count: state.count + 1,
      notes: [...state.notes, { content, id: state.count + 1 }],
    }));
  },
  removeNote: (id) =>
    set((state) => ({
      notes: state.notes.filter((note) => note.id !== id),
    })),
  editeNote: (id, content) =>
    set((state) => ({
      notes: state.notes.map((note) =>
        note.id === id ? { ...note, content } : note,
      ),
    })),
}));
