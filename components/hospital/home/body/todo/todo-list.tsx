import NoResultSquirrel from '@/components/common/no-result-squirrel'
import SingleTodo from '@/components/hospital/home/body/todo/single-todo'
import { formatDate } from '@/lib/utils/utils'
import type { ClientTodo } from '@/types/hospital/todo'

type Props = {
  date: Date
  hosId: string
  todos: ClientTodo[]
  refetch: () => Promise<void>
}

export default function TodoList({ date, hosId, todos, refetch }: Props) {
  const formattedDate = formatDate(date)
  return (
    <>
      <span className="font-semibold">{formattedDate}</span>

      {todos.length === 0 ? (
        <NoResultSquirrel
          text="TODO가 없습니다"
          size="sm"
          className="flex-col pb-2"
        />
      ) : (
        <ul className="flex flex-col divide-y divide-gray-200">
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
