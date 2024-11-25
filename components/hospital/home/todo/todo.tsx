'use client'

import NoticeTodoRefreshButton from '@/components/hospital/home/notice-todo-refresh-button'
import EditTodoDialog from '@/components/hospital/home/todo/edit-todo-dialog'
import TodoDatePicker from '@/components/hospital/home/todo/todo-date-picker'
import TodoList from '@/components/hospital/home/todo/todo-list'
import TodoSkeleton from '@/components/hospital/home/todo/todo-skeleton'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { getTodos } from '@/lib/services/hospital-home/todo'
import { useTodoStore } from '@/lib/store/icu/todo'
import { formatDate, getYesterdayTodayTomorrow } from '@/lib/utils/utils'
import type { QueriedTodo } from '@/types/hospital/todo'
import { useEffect, useState } from 'react'

export default function Todo({
  todosData: initialTodosData,
  hosId,
}: {
  todosData: QueriedTodo[]
  hosId: string
}) {
  const [isLoading, setIsLoading] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [todosData, setTodosData] = useState<QueriedTodo[]>([])

  const { yesterday, today, tomorrow } = getYesterdayTodayTomorrow(selectedDate)
  const { todo, isTodoDialogOpen } = useTodoStore()

  const isSelectedDateDefault = today === formatDate(new Date())
  const yesterdayTodos = todosData.filter(
    (todo) => todo.target_date === yesterday,
  )
  const todayTodos = todosData.filter((todo) => todo.target_date === today)
  const tomorrowTodos = todosData.filter(
    (todo) => todo.target_date === tomorrow,
  )

  useEffect(() => {
    setTodosData(initialTodosData)
  }, [initialTodosData])

  useEffect(() => {
    const fetchTodos = async () => {
      setIsLoading(true)

      const newTodosData = await getTodos(hosId, selectedDate)
      setTodosData(newTodosData)

      setIsLoading(false)
    }

    fetchTodos()
  }, [selectedDate, hosId])

  return (
    <Card className="w-full rounded-sm md:w-[600px]">
      <CardHeader>
        <CardTitle>
          <div className="flex justify-between gap-1">
            <div className="flex items-center">
              <h4>TODO</h4>
              <NoticeTodoRefreshButton />
            </div>

            <div>
              <TodoDatePicker
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
              />
            </div>
          </div>
        </CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col gap-4">
        {isLoading ? (
          <TodoSkeleton />
        ) : (
          <>
            <TodoList
              type="어제"
              date={yesterday}
              todos={yesterdayTodos}
              hosId={hosId}
              className="text-muted-foreground"
              isSelectedDateDefault={isSelectedDateDefault}
            />

            <Separator />

            <TodoList
              type="오늘"
              date={today}
              todos={todayTodos}
              hosId={hosId}
              isSelectedDateDefault={isSelectedDateDefault}
            />

            <Separator />

            <TodoList
              type="내일"
              date={tomorrow}
              todos={tomorrowTodos}
              hosId={hosId}
              className="text-muted-foreground"
              isSelectedDateDefault={isSelectedDateDefault}
            />
          </>
        )}
      </CardContent>

      {isTodoDialogOpen && <EditTodoDialog hosId={hosId} type={todo.type} />}
    </Card>
  )
}
