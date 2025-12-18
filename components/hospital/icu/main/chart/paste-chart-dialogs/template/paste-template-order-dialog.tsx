import { pasteTemplateColumns } from '@/components/hospital/icu/main/chart/paste-chart-dialogs/template/paste-template-columns'
import { Button } from '@/components/ui/button'
import DataTable from '@/components/ui/data-table'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Skeleton } from '@/components/ui/skeleton'
import { getIcuTemplates } from '@/lib/services/icu/template/template'
import type { IcuTemplate } from '@/types'
import { BookmarkIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import DialogTriggerButton from '../dialog-trigger-button'

// OrderCreatorRowProps : 이미 생성된 차트에서 템플릿오더를 추가
// PasteChartDialogProps : 익일차트 혹은 첫차트에서 템플릿 오더를 추가

type Props = OrderCreatorRowProps | PasteChartDialogProps

type OrderCreatorRowProps = {
  hosId: string
  isOrderCreator: true
  chartId: string
  patientId: null
  targetDate: null
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

type PasteChartDialogProps = {
  hosId: string
  isOrderCreator: false
  chartId: null
  patientId: string
  targetDate: string
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export default function PasteTemplateOrderDialog({
  isOrderCreator,
  chartId,
  targetDate,
  patientId,
  hosId,
  open: controlledOpen,
  onOpenChange: setControlledOpen,
}: Props) {
  const [templateCharts, setTemplateCharts] = useState<IcuTemplate[]>([])
  const [internalOpen, setInternalOpen] = useState(false)
  const [isFetching, setIsFetching] = useState(false)

  const isControlled = controlledOpen !== undefined
  const isDialogOpen = isControlled ? controlledOpen : internalOpen

  const setIsDialogOpen = (
    open: boolean | ((prevState: boolean) => boolean),
  ) => {
    const nextOpen = typeof open === 'function' ? open(isDialogOpen) : open
    if (isControlled) {
      setControlledOpen?.(nextOpen)
    } else {
      setInternalOpen(nextOpen)
    }
  }

  const handleDialogOpenChange = async (open: boolean) => {
    setIsDialogOpen(open)
  }

  useEffect(() => {
    const fetchTemplates = async () => {
      setIsFetching(true)

      const templates = await getIcuTemplates(hosId)
      setTemplateCharts(templates)

      setIsFetching(false)
    }
    isDialogOpen && fetchTemplates()
  }, [isDialogOpen])

  return (
    <Dialog open={isDialogOpen} onOpenChange={handleDialogOpenChange}>
      {!isControlled && (
        <DialogTriggerButton icon={BookmarkIcon} title="템플릿 차트 붙여넣기" />
      )}

      <DialogContent className="flex h-[609.5px] flex-col justify-start md:max-w-[1200px]">
        <DialogHeader>
          <DialogTitle>
            {isOrderCreator ? '템플릿 오더 추가' : '템플릿 차트 붙여넣기'}
          </DialogTitle>
          <DialogDescription>템플릿을 선택해주세요</DialogDescription>
        </DialogHeader>

        {isFetching ? (
          <Skeleton className="h-[450px]" />
        ) : (
          <DataTable
            columns={pasteTemplateColumns(
              isOrderCreator
                ? {
                    setIsDialogOpen,
                    isOrderCreator: true,
                    chartId: chartId!,
                    patientId: null,
                    targetDate: null,
                  }
                : {
                    setIsDialogOpen,
                    isOrderCreator: false,
                    chartId: null,
                    patientId: patientId!,
                    targetDate: targetDate!,
                  },
            )}
            data={templateCharts}
            searchPlaceHolder="템플릿 이름 · 템플릿 설명 검색"
            rowLength={6}
          />
        )}

        <DialogFooter className="mt-auto">
          <DialogClose asChild>
            <Button size="sm" type="button" variant="outline">
              닫기
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
