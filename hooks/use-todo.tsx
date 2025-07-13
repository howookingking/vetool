import { getTodos } from '@/lib/services/hospital-home/todo'
import { type ClientTodo } from '@/types/hospital/todo'
import { useEffect, useState } from 'react'

export const useTodos = (hosId: string, selectedDate: Date) => {
  const [isLoading, setIsLoading] = useState(true)
  const [todos, setTodos] = useState({
    dayBeforTodos: [] as ClientTodo[],
    seletctedDayTodos: [] as ClientTodo[],
    dayAfterTodos: [] as ClientTodo[],
  })

  const fetchTodos = async () => {
    setIsLoading(true)

    const result = await getTodos(hosId, selectedDate)

    
    setTodos(result)
    setIsLoading(false)
  }

  useEffect(() => {
    fetchTodos()
  }, [selectedDate, hosId])

  return { todos, isLoading, refetch: fetchTodos }
}
