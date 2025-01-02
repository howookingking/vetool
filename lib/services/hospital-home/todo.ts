'use server'

import { createClient } from '@/lib/supabase/server'
import { getConsecutiveDays } from '@/lib/utils/utils'
import { redirect } from 'next/navigation'

export const getTodos = async (hosId: string, selectedDate: Date) => {
  const supabase = await createClient()
  const { dayBefore, seletctedDay, dayAfter } = getConsecutiveDays(selectedDate)

  const { data, error } = await supabase
    .from('todos')
    .select('id, is_done, target_date, target_user, todo_title')
    .match({ hos_id: hosId })
    .in('target_date', [dayBefore, seletctedDay, dayAfter])
    .order('created_at')

  if (error) {
    console.error(error)
    redirect(`/error?message=${error.message}`)
  }

  return {
    dayBeforTodos: data.filter((todo) => todo.target_date === dayBefore),
    seletctedDayTodos: data.filter((todo) => todo.target_date === seletctedDay),
    dayAfterTodos: data.filter((todo) => todo.target_date === dayAfter),
  }
}

export const upsertTodo = async (
  todo_title_input: string,
  target_user_input: string | undefined,
  date: string,
  hosId: string,
  id?: string,
) => {
  const supabase = await createClient()

  const { error } = await supabase.from('todos').upsert({
    todo_title: todo_title_input,
    hos_id: hosId,
    target_user: target_user_input,
    target_date: date,
    id,
  })

  if (error) {
    console.error(error)
    redirect(`/error?message=${error.message}`)
  }
}

export const toggleIsDone = async (todoId: string, isDone: boolean) => {
  const supabase = await createClient()
  const { error } = await supabase
    .from('todos')
    .update({
      is_done: !isDone,
    })
    .match({ id: todoId })

  if (error) {
    console.error(error)
    redirect(`/error?message=${error.message}`)
  }
}

export const deleteTodo = async (todoId: string) => {
  const supabase = await createClient()
  const { error } = await supabase.from('todos').delete().match({ id: todoId })

  if (error) {
    console.error(error)
    redirect(`/error?message=${error.message}`)
  }
}
