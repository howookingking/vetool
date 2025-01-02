'use client'

import UserAvatar from '@/components/hospital/common/user-avatar'
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
import { toast } from '@/components/ui/use-toast'
import { pasteChart } from '@/lib/services/icu/chart/paste-chart'
import { useRealtimeSubscriptionStore } from '@/lib/store/icu/realtime-subscription'
import { cn } from '@/lib/utils/utils'
import { useBasicHosDataContext } from '@/providers/basic-hos-data-context-provider'
import type { PrevIoChartData } from '@/types/icu/chart'
import { CalendarPlus, LoaderCircle } from 'lucide-react'
import Image from 'next/image'
import { useParams, useRouter } from 'next/navigation'
import { useState } from 'react'

export default function CopyPrevIoChartDialog({
  prevIoChartData,
}: {
  prevIoChartData: PrevIoChartData
}) {
  const { refresh } = useRouter()
  const { patient_id, target_date } = useParams()
  const { isSubscriptionReady } = useRealtimeSubscriptionStore()
  const {
    basicHosData: { vetsListData, showOrderer },
  } = useBasicHosDataContext()
  const { icu_chart_id: prevChartId, target_date: prevDate } = prevIoChartData

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [orderer, setOrderer] = useState(vetsListData[0].name)

  const handleCopyPrevIoChart = async () => {
    setIsLoading(true)

    await pasteChart(
      patient_id as string,
      prevChartId,
      target_date as string,
      orderer,
    )

    toast({
      title: '최근 입원 차트를 복사하였습니다',
    })

    setIsLoading(false)
    setIsDialogOpen(false)
    if (!isSubscriptionReady) refresh()
  }

  const handleOrdererChange = (value: string) => {
    setOrderer(value)
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="hidden h-1/3 w-full items-center justify-center gap-2 md:flex md:h-1/3 md:w-2/3 lg:w-1/2"
        >
          <CalendarPlus size={20} />
          <div className="flex flex-wrap justify-center">
            <span>최근 입원 차트 복사</span>
            <span>{`(${prevDate})`}</span>
          </div>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>최근 입원 차트 복사</DialogTitle>
          <DialogDescription>
            최근 입원 차트{`(${prevDate})`}를 복사하여 {target_date} 차트가
            생성됩니다
          </DialogDescription>

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
                          <UserAvatar alt={vet.name} src={vet.avatar_url} />
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
          <Button onClick={handleCopyPrevIoChart} disabled={isLoading}>
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
