import { Button } from '@/components/ui/button'
import { deleteTodo } from '@/lib/services/hospital-home/todo'
import { Dispatch, SetStateAction } from 'react'

export default function DeleteTodoDialog({
  todoId,
  setIsDialogOpen,
  refetch,
}: {
  todoId: string
  setIsDialogOpen: Dispatch<SetStateAction<boolean>>
  refetch: () => Promise<void>
}) {
  const handleDeleteNotice = async () => {
    setIsDialogOpen(false)
    await deleteTodo(todoId)
    await refetch()
  }

  return (
    <Button type="button" variant="destructive" onClick={handleDeleteNotice}>
      삭제
    </Button>
  )
}
