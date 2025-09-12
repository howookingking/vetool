import { Checkbox } from '@/components/ui/checkbox'
import { toggleIsDone } from '@/lib/services/hospital-home/todo'
import type { ClientTodo } from '@/types/hospital/todo'
import { useEffect, useState } from 'react'
import UpsertTodoDialog from './upsert-todo-dialog'

type Props = {
  todo: ClientTodo
  hosId: string
  date: Date
  refetch: () => Promise<void>
}

export default function SingleTodo({ todo, hosId, date, refetch }: Props) {
  const [isUpdating, setIsUpdating] = useState(false)
  const [isChecked, setIsChecked] = useState(todo.is_done)

  useEffect(() => {
    setIsChecked(todo.is_done)
  }, [todo.is_done])

  const handleIsDone = async () => {
    setIsUpdating(true)

    setIsChecked((prev) => !prev)

    await toggleIsDone(todo.id, todo.is_done)

    setIsUpdating(false)
  }

  return (
    <li className="flex justify-between gap-2 py-2">
      <div className="flex items-center gap-1.5">
        <Checkbox
          id={todo.id}
          disabled={isUpdating}
          checked={isChecked}
          onClick={(e) => e.stopPropagation()}
          onCheckedChange={handleIsDone}
        />
        <label
          htmlFor={todo.id}
          className="cursor-pointer transition hover:underline"
        >
          {todo.todo_title}
        </label>
      </div>

      <div className="flex shrink-0 items-center gap-2">
        <span className="text-xs text-muted-foreground">
          {todo.target_user ?? ''}
        </span>

        <UpsertTodoDialog
          todo={todo}
          date={date}
          hosId={hosId}
          refetch={refetch}
          isEdit
        />
      </div>
    </li>
  )
}
