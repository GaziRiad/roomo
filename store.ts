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

interface AudioState {
  isMute: boolean;
  volume: number;
  toggleMute: () => void;
  setVolume: (volume: number) => void;
  setMuteValue: (val: boolean) => void;
}

export const useAudio = create<AudioState>((set) => ({
  isMute: true,
  volume: 20,
  toggleMute: () =>
    set((state) => ({
      isMute: !state.isMute,
    })),
  setMuteValue: (val) =>
    set(() => ({
      isMute: val,
    })),
  setVolume: (volume) =>
    set(() => ({
      volume: Math.max(0, Math.min(100, volume)),
    })),
}));

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

// store in local :
{
  /*
  import { create } from "zustand";
import { persist } from "zustand/middleware";

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

interface AudioState {
  isMute: boolean;
  volume: number;
  toggleMute: () => void;
  setVolume: (volume: number) => void;
  setMuteValue: (val: boolean) => void;
}

export const useAudio = create<AudioState>((set) => ({
  isMute: true,
  volume: 20,
  toggleMute: () =>
    set((state) => ({
      isMute: !state.isMute,
    })),
  setMuteValue: (val) =>
    set(() => ({
      isMute: val,
    })),
  setVolume: (volume) =>
    set(() => ({
      volume: Math.max(0, Math.min(100, volume)),
    })),
}));

export const useTimer = create(
  persist<TimerState>(
    (set) => ({
      timer: false,
      showTimer: () => set(() => ({ timer: true })),
      hideTimer: () => set(() => ({ timer: false })),
    }),
    { name: "timer-state" },
  ),
);

export const useTodoList = create(
  persist<TodoListState>(
    (set) => ({
      todoList: false,
      showTodoList: () => set(() => ({ todoList: true })),
      hideTodoList: () => set(() => ({ todoList: false })),
    }),
    { name: "todo-list-state" },
  ),
);

export const useStickyNotes = create(
  persist<StickyNotesState>(
    (set) => ({
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
    }),
    { name: "sticky-notes-state" },
  ),
);

  */
}
