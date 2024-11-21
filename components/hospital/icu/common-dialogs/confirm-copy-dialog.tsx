import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { toast } from '@/components/ui/use-toast'
import { pasteChart } from '@/lib/services/icu/chart/paste-chart'
import { useCopiedChartStore } from '@/lib/store/icu/copied-chart'
import { cn } from '@/lib/utils/utils'
import { useBasicHosDataContext } from '@/providers/basic-hos-data-context-provider'
import { LoaderCircle } from 'lucide-react'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import { useState } from 'react'

export function ConfirmCopyDialog({
  setTemplateDialogOpen,
}: {
  setTemplateDialogOpen: (isTemplateDialogOpen: boolean) => void
}) {
  const { target_date, patient_id } = useParams()
  const {
    isConfirmCopyDialogOpen,
    setIsConfirmCopyDialogOpen,
    copiedChartId,
    reset,
  } = useCopiedChartStore()
  const {
    basicHosData: { vetsListData, showOrderer },
  } = useBasicHosDataContext()
  const [orderer, setOrderer] = useState(vetsListData[0].name)
  const [isLoading, setIsLoading] = useState(false)

  const handleConfirmCopy = async () => {
    setIsLoading(true)
    await pasteChart(
      patient_id as string,
      copiedChartId!,
      target_date as string,
      orderer,
    )

    toast({
      title: '차트를 생성하였습니다',
    })

    setIsLoading(false)
    reset()
    setTemplateDialogOpen(false)
  }

  const handleOrdererChange = (value: string) => {
    setOrderer(value)
  }

  return (
    <Dialog
      open={isConfirmCopyDialogOpen}
      onOpenChange={setIsConfirmCopyDialogOpen}
    >
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>차트를 생성하시겠습니까?</DialogTitle>
          {showOrderer && (
            <div>
              <Label className="pt-4">오더결정 수의사</Label>
              <Select
                onValueChange={handleOrdererChange}
                defaultValue={orderer}
              >
                <SelectTrigger
                  className={cn(
                    'h-8 text-sm',
                    !orderer && 'text-muted-foreground',
                  )}
                >
                  <SelectValue placeholder="수의사를 선택해주세요" />
                </SelectTrigger>
                <SelectContent>
                  {vetsListData.map((vet) => (
                    <SelectItem
                      key={vet.user_id}
                      value={vet.name}
                      className="w-full"
                    >
                      <div className="flex items-center gap-2">
                        {vet.avatar_url && (
                          <Image
                            unoptimized
                            src={vet.avatar_url ?? ''}
                            alt={vet.name}
                            width={20}
                            height={20}
                            className="rounded-full"
                          />
                        )}
                        <span>{vet.name}</span>
                        {vet.position && (
                          <span className="text-xs">({vet.position})</span>
                        )}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
        </DialogHeader>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setIsConfirmCopyDialogOpen(false)}
          >
            취소
          </Button>
          <Button onClick={handleConfirmCopy} disabled={isLoading}>
            확인
            <LoaderCircle
              className={cn(isLoading ? 'animate-spin' : 'hidden')}
            />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
