import TodoList from '@/components/hospital/home/todo/todo-list'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { getYesterdayTodayTomorrow } from '@/lib/utils/utils'
import type { QueriedTodo } from '@/types/hospital/todo'
import NoticeTodoRefreshButton from '../notice-todo-refresh-button'

export default function Todo({
  todosData,
  hosId,
}: {
  todosData: QueriedTodo[]
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
    <Card className="w-full rounded-sm md:w-[600px]">
      <CardHeader>
        <CardTitle>
          <div className="flex items-center gap-1">
            <h4>TODO</h4>
            <NoticeTodoRefreshButton />
          </div>
        </CardTitle>
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
