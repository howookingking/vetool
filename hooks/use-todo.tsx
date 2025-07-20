import { fetchTodos } from '@/lib/services/hospital-home/todo'
import type { ClientTodo } from '@/types/hospital/todo'
import { useEffect, useState } from 'react'

export const useTodos = (hosId: string, selectedDate: Date) => {
  const [isFetching, setIsFetching] = useState(true)
  const [todos, setTodos] = useState<{
    dayBeforTodos: ClientTodo[]
    seletctedDayTodos: ClientTodo[]
    dayAfterTodos: ClientTodo[]
  }>({
    dayBeforTodos: [],
    seletctedDayTodos: [],
    dayAfterTodos: [],
  })

  const getTodos = async () => {
    setIsFetching(true)

    const todosData = await fetchTodos(hosId, selectedDate)

    setTodos(todosData)
    setIsFetching(false)
  }

  useEffect(() => {
    getTodos()
  }, [selectedDate, hosId])

  return { todos, isFetching, refetch: getTodos }
}
