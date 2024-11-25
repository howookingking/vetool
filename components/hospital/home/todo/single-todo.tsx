'use client'

import { Checkbox } from '@/components/ui/checkbox'
import { toggleIsDone } from '@/lib/services/hospital-home/todo'
import { useTodoStore } from '@/lib/store/icu/todo'
import { cn } from '@/lib/utils/utils'
import type { QueriedTodo } from '@/types/hospital/todo'
import { LoaderCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function SingleTodo({
  todo,
  type,
}: {
  todo: QueriedTodo
  type: '어제' | '오늘' | '내일' | ''
}) {
  const [isToggling, setIsToggling] = useState(false)
  const [isChecked, setIsChecked] = useState(todo.is_done)
  const { refresh } = useRouter()
  const { setTodo, setIsTodoDialogOpen } = useTodoStore()

  useEffect(() => {
    setIsChecked(todo.is_done)
  }, [todo.is_done])

  const handleIsDone = async () => {
    setIsToggling(true)
    setIsChecked((prev) => !prev)

    await toggleIsDone(todo.id, todo.is_done)

    refresh()
    setIsToggling(false)
  }

  const handleTodoClick = () => {
    setTodo({ ...todo, type })
    setIsTodoDialogOpen(true)
  }

  return (
    <li
      className="flex cursor-pointer items-center justify-between"
      onClick={handleTodoClick}
    >
      <div className="flex items-center gap-1.5">
        {isToggling ? (
          <LoaderCircle className="h-4 w-4 animate-spin text-primary" />
        ) : (
          <Checkbox
            id={todo.id}
            disabled={isToggling}
            checked={isChecked}
            onClick={(e) => e.stopPropagation()}
            onCheckedChange={handleIsDone}
          />
        )}

        <label
          htmlFor={todo.id}
          className={cn(
            type === '어제' ? '' : 'cursor-pointer',
            'leading-none hover:underline',
          )}
        >
          {todo.todo_title}
        </label>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-sm">담당 : {todo.target_user ?? '없음'}</span>
      </div>
    </li>
  )
}
