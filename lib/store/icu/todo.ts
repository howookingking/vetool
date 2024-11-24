import type { QueriedTodo } from '@/types/hospital/todo'
import { create } from 'zustand'

type TodoState = {
  isTodoDialogOpen: boolean
  setIsTodoDialogOpen: (isOpen: boolean) => void

  todo: QueriedTodo & { type: '어제' | '오늘' | '내일' | '' }
  setTodo: (todo: QueriedTodo & { type: '어제' | '오늘' | '내일' | '' }) => void
}

export const useTodoStore = create<TodoState>((set) => ({
  isTodoDialogOpen: false,
  setIsTodoDialogOpen: (state) => set({ isTodoDialogOpen: state }),

  todo: {} as QueriedTodo & { type: '오늘' | '내일' },
  setTodo: (todo) => set({ todo }),
}))
