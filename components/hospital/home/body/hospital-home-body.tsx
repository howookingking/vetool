import Notice from './notice/notice'
import Todo from './todo/todo'

export default function HospitalHomeBody({ hosId }: { hosId: string }) {
  return (
    <div className="flex w-full flex-col gap-2 p-2 xl:flex-row">
      <Notice hosId={hosId} />

      <Todo hosId={hosId} />
    </div>
  )
}
