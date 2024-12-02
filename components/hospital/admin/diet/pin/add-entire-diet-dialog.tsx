import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { LoaderCircle, Pin } from 'lucide-react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { addEntireDietPin } from '@/lib/services/admin/diet/diet'
import { toast } from '@/components/ui/use-toast'

export default function AddEntireDietDialog({
  isDialogOpen,
  setIsDialogOpen,
  hosId,
}: {
  isDialogOpen: boolean
  setIsDialogOpen: (isDialogOpen: boolean) => void
  hosId: string
}) {
  const [isLoading, setIsLoading] = useState(false)
  const { refresh } = useRouter()

  const handleButtonClick = async () => {
    setIsLoading(true)

    await addEntireDietPin(hosId)

    setIsLoading(false)
    setIsDialogOpen(false)

    toast({
      title: '사료 전체 등록 완료',
      description: '벳툴 제공 사료를 모두 등록했습니다',
    })
    refresh()
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>사료 전체 등록</DialogTitle>
          <DialogDescription>
            벳툴이 제공하는 모든 사료 정보를 병원에 등록하시겠습니까?
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-2"></div>

        <DialogFooter className="ml-auto w-full gap-2 md:gap-0">
          <DialogClose asChild>
            <Button type="button" variant="outline" tabIndex={-1}>
              닫기
            </Button>
          </DialogClose>

          <Button
            type="button"
            onClick={handleButtonClick}
            disabled={isLoading}
          >
            등록
            {isLoading && <LoaderCircle className="animate-spin" />}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
