import { cn } from '@/lib/utils/utils'
import type { QueriedTodo } from '@/types/hospital/todo'
import CreateTodoDialog from './create-todo-dialog'
import SingleTodo from './single-todo'

export default function TodoList({
  date,
  type,
  hosId,
  todos,
  className,
}: {
  date: string
  type: '어제' | '오늘' | '내일'
  hosId: string
  todos: QueriedTodo[]
  className?: string
}) {
  return (
    <div className={cn(className)}>
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center gap-1 text-lg">
          <span>{type}</span>
          <span className="text-sm">({date})</span>
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
