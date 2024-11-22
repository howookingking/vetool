import CreateTodoDialog from '@/components/hospital/home/todo/create-todo-dialog'
import SingleTodo from '@/components/hospital/home/todo/single-todo'
import { cn, formatDate } from '@/lib/utils/utils'
import type { QueriedTodo } from '@/types/hospital/todo'

export default function TodoList({
  date,
  type,
  hosId,
  todos,
  className,
  isSelectedDateDefault,
}: {
  date: string
  type: '어제' | '오늘' | '내일' | ''
  hosId: string
  todos: QueriedTodo[]
  className?: string
  isSelectedDateDefault: boolean
}) {
  return (
    <div className={cn(className)}>
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center gap-1 text-lg">
          <span>{isSelectedDateDefault && type}</span>
          {isSelectedDateDefault ? (
            <span className="text-sm">({date})</span>
          ) : (
            <span className="text-sm">{date}</span>
          )}
        </div>
        {type !== '어제' && (
          <CreateTodoDialog hosId={hosId} type={type} date={date} />
        )}
      </div>

      {todos.length === 0 ? (
        <div className="text-center font-bold">TODO가 없습니다</div>
      ) : (
        <ul className="flex flex-col gap-2">
          {todos.map((todo) => (
            <SingleTodo key={todo.id} todo={todo} type={type} />
          ))}
        </ul>
      )}
    </div>
  )
}
