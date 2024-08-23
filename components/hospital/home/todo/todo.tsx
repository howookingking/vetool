import TodoList from '@/components/hospital/home/todo/todo-list'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { getYesterdayTodayTomorrow } from '@/lib/utils'
import type { Todo } from '@/types'

export default function Todo({
  todosData,
  hosId,
}: {
  todosData: Todo[]
  hosId: string
}) {
  const { yesterday, today, tomorrow } = getYesterdayTodayTomorrow()
  const yesterdayTodos = todosData.filter(
    (todo) => todo.target_date === yesterday,
  )
  const todayTodos = todosData.filter((todo) => todo.target_date === today)
  const tomorrowTodos = todosData.filter(
    (todo) => todo.target_date === tomorrow,
  )

  return (
    <Card className="h-1/2 w-[480px] rounded-sm">
      <CardHeader>
        <CardTitle>TODO</CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col gap-4">
        <TodoList
          type="어제"
          date={yesterday}
          todos={yesterdayTodos}
          hosId={hosId}
          className="text-muted-foreground"
        />

        <Separator />

        <TodoList type="오늘" date={today} todos={todayTodos} hosId={hosId} />

        <Separator />

        <TodoList
          type="내일"
          date={tomorrow}
          todos={tomorrowTodos}
          hosId={hosId}
          className="text-muted-foreground"
        />
      </CardContent>
    </Card>
  )
}