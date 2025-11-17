import NoResultSquirrel from '@/components/common/no-result-squirrel'
import SingleTodo from '@/components/hospital/home/body/todo/single-todo'

import type { ClientTodo } from '@/types/hospital/todo'
import { formatDate } from 'date-fns'

type Props = {
  date: Date
  hosId: string
  todos: ClientTodo[]
  refetch: () => Promise<void>
  activeFilter: 'all' | 'done' | 'not-done'
}

export default function TodoList({
  date,
  hosId,
  todos,
  refetch,
  activeFilter,
}: Props) {
  const formattedDate = formatDate(date, 'yyyy-MM-dd')

  const filteredTodos = todos.filter((todo) => {
    if (activeFilter === 'all') return true
    if (activeFilter === 'done') return todo.is_done
    if (activeFilter === 'not-done') return !todo.is_done
    return true
  })

  return (
    <>
      <span className="font-semibold">{formattedDate}</span>

      {filteredTodos.length === 0 ? (
        <NoResultSquirrel
          text="TODO가 없습니다"
          size="sm"
          className="flex-col pb-2"
        />
      ) : (
        <ul className="flex flex-col divide-y divide-gray-200">
          {filteredTodos.map((todo) => (
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
