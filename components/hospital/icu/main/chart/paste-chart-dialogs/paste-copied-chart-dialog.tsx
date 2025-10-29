'use client'

import { Button } from '@/components/ui/button'
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
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { pasteChart } from '@/lib/services/icu/chart/paste-chart'
import { useCopiedChartStore } from '@/lib/store/icu/copied-chart'
import { cn } from '@/lib/utils/utils'
import { useBasicHosDataContext } from '@/providers/basic-hos-data-context-provider'
import { ClipboardCheckIcon, LoaderCircleIcon } from 'lucide-react'
import Image from 'next/image'
import { useParams, useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'

export default function PasteCopiedChartDialog() {
  const { refresh } = useRouter()
  const { target_date, patient_id } = useParams()

  const { copiedChartId, reset } = useCopiedChartStore()
  const {
    basicHosData: { vetList, showOrderer },
  } = useBasicHosDataContext()

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [orderer, setOrderer] = useState(vetList[0].name)
  const [isLoading, setIsLoading] = useState(false)

  const handlePasteCopiedChart = async () => {
    if (!copiedChartId) {
      setIsDialogOpen(false)

      toast.error('복사할 차트가 없습니다', {
        description: '차트를 먼저 복사해주세요',
      })

      return
    }

    setIsLoading(true)

    await pasteChart(
      patient_id as string,
      copiedChartId,
      target_date as string,
      orderer,
    )

    toast.success('차트를 붙여넣었습니다', {
      description: '복사한 차트는 클립보드에서 제거됩니다',
    })

    setIsLoading(false)
    setIsDialogOpen(false)
    reset()
    refresh()
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="hidden h-1/3 w-full items-center justify-center gap-2 md:flex md:h-1/3 md:w-2/3 lg:w-1/2"
        >
          <ClipboardCheckIcon />
          <span>복사한 차트 붙여넣기</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>복사한 차트 생성</DialogTitle>
          <DialogDescription>
            클립보드에 복사한 차트를 붙여넣어 차트가 생성됩니다
          </DialogDescription>

          {showOrderer && (
            <div>
              <Label className="pt-4">오더결정 수의사</Label>
              <Select onValueChange={setOrderer} defaultValue={orderer}>
                <SelectTrigger
                  className={cn(
                    'h-8 text-sm',
                    !orderer && 'text-muted-foreground',
                  )}
                >
                  <SelectValue placeholder="수의사를 선택해주세요" />
                </SelectTrigger>
                <SelectContent>
                  {vetList.map((vet) => (
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

        <DialogFooter className="gap-2 md:gap-0">
          <DialogClose asChild>
            <Button type="button" variant="outline" tabIndex={-1}>
              취소
            </Button>
          </DialogClose>
          <Button onClick={handlePasteCopiedChart} disabled={isLoading}>
            확인
            <LoaderCircleIcon
              className={cn(isLoading ? 'animate-spin' : 'hidden')}
            />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
