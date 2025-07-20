'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { useTodos } from '@/hooks/use-todo'
import { addDays, subDays } from 'date-fns'
import { RefreshCcw } from 'lucide-react'
import { useState } from 'react'
import TodoDatePicker from './todo-date-picker'
import TodoList from './todo-list'
import TodoSkeleton from './todo-skeleton'
import UpsertTodoDialog from './upsert-todo-dialog'

export default function Todo({ hosId }: { hosId: string }) {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const { isFetching, todos, refetch } = useTodos(hosId, selectedDate)

  return (
    <Card className="w-full rounded-sm xl:w-1/2">
      <CardHeader className="border-b p-4">
        <CardTitle>
          <div className="flex items-center justify-between gap-1">
            <div className="flex items-center gap-1">
              <h4>TODO</h4>
              <Button variant="ghost" size="icon" onClick={refetch}>
                <RefreshCcw />
              </Button>
            </div>

            <TodoDatePicker
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
            />

            <UpsertTodoDialog
              hosId={hosId}
              date={selectedDate}
              refetch={refetch}
            />
          </div>
        </CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col p-4">
        {isFetching ? (
          <TodoSkeleton />
        ) : (
          <>
            {/* 선택일 전날 */}
            <TodoList
              date={subDays(selectedDate, 1)}
              todos={todos.dayBeforTodos}
              hosId={hosId}
              refetch={refetch}
            />

            <Separator className="my-2 bg-gray-800" />

            {/* 선택일 */}
            <TodoList
              date={selectedDate}
              todos={todos.seletctedDayTodos}
              hosId={hosId}
              refetch={refetch}
            />

            <Separator className="my-2 bg-gray-800" />

            {/* 선택일 다음날 */}
            <TodoList
              date={addDays(selectedDate, 1)}
              todos={todos.dayAfterTodos}
              hosId={hosId}
              refetch={refetch}
            />
          </>
        )}
      </CardContent>
    </Card>
  )
}
