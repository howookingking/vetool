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

export default function Todo({ hosId }: { hosId: string }) {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const { isLoading, todos, refetch } = useTodos(hosId, selectedDate)

  return (
    <Card className="w-full border-none shadow-none">
      <CardHeader>
        <CardTitle>
          <div className="flex justify-between gap-1">
            <div className="flex items-center gap-1">
              <h4>TODO</h4>
              <Button variant="ghost" size="icon" onClick={refetch}>
                <RefreshCcw />
              </Button>
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
              date={subDays(selectedDate, 1)}
              todos={todos.dayBeforTodos}
              hosId={hosId}
              refetch={refetch}
            />

            <Separator />

            <TodoList
              date={selectedDate}
              todos={todos.seletctedDayTodos}
              hosId={hosId}
              refetch={refetch}
            />

            <Separator />

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
