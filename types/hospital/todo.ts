import { Todo } from '@/types'

export type ClientTodo = Omit<Todo, 'created_at' | 'hos_id'>
