import NoResultSquirrel from '@/components/common/no-result-squirrel'
import { formatDate } from '@/lib/utils/utils'
import type { ClientTodo } from '@/types/hospital/todo'
import SingleTodo from './single-todo'
import UpsertTodoDialog from './upsert-todo-dialog'

export default function TodoList({
  date,
  hosId,
  todos,
  refetch,
}: {
  date: Date
  hosId: string
  todos: ClientTodo[]
  refetch: () => Promise<void>
}) {
  const formattedToday = formatDate(new Date())
  return (
    <>
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm">
          <span>{formatDate(date)}</span>
          {formattedToday === formatDate(date) && (
            <span className="font-bold text-primary">오늘</span>
          )}
        </div>

        <UpsertTodoDialog hosId={hosId} date={date} refetch={refetch} />
      </div>

      {todos.length === 0 ? (
        <NoResultSquirrel text="TODO가 없습니다" size="sm" />
      ) : (
        <ul className="flex flex-col gap-2">
          {todos.map((todo) => (
            <SingleTodo
              key={todo.id}
              todo={todo}
              hosId={hosId}
              date={date}
              refetch={refetch}
            />
          ))}
        </ul>
      )}
    </>
  )
}
