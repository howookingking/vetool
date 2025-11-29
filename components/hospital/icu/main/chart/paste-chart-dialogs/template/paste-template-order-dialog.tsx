import { templateColumns } from '@/components/hospital/icu/main/chart/paste-chart-dialogs/template/template-columns'
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
  DialogTrigger,
} from '@/components/ui/dialog'
import { Spinner } from '@/components/ui/spinner'
import { getIcuTemplates } from '@/lib/services/icu/template/template'
import type { IcuTemplate } from '@/types'
import { BookmarkIcon } from 'lucide-react'
import { useState } from 'react'
import DialogTriggerButton from '../dialog-trigger-button'

type Props = {
  tableHeader?: boolean
  chartId?: string
  targetDate: string
  patientId: string
  hosId: string
}

export default function PasteTemplateOrderDialog({
  tableHeader,
  chartId,
  targetDate,
  patientId,
  hosId,
}: Props) {
  const [templateCharts, setTemplateCharts] = useState<IcuTemplate[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isFetching, setIsFetching] = useState(false)

  const handleDialogOpenChange = async (open: boolean) => {
    if (open) {
      setIsFetching(true)

      const templateCharts = await getIcuTemplates(hosId)
      setTemplateCharts(templateCharts)

      setIsFetching(false)
      setIsDialogOpen(true)
    } else {
      setIsDialogOpen(false)
    }
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={handleDialogOpenChange}>
      {tableHeader ? (
        <DialogTrigger asChild className="relative">
          <Button
            size="icon"
            variant="ghost"
            className="hidden shrink-0 md:inline-flex"
            disabled={isFetching}
          >
            {isFetching ? <Spinner /> : <BookmarkIcon />}
          </Button>
        </DialogTrigger>
      ) : (
        <DialogTriggerButton
          icon={BookmarkIcon}
          title="템플릿 차트 붙여넣기"
          isLoading={isFetching}
        />
      )}

      <DialogContent className="md:max-w-[1200px]">
        <DialogHeader>
          <DialogTitle>
            {tableHeader ? '템플릿 오더 추가' : '템플릿 차트 붙여넣기'}
          </DialogTitle>
          <DialogDescription>템플릿을 선택해주세요</DialogDescription>
        </DialogHeader>

        <DataTable
          columns={templateColumns(
            setIsDialogOpen,
            tableHeader,
            chartId,
            targetDate,
            patientId,
          )}
          data={templateCharts}
          searchPlaceHolder="템플릿 이름 · 템플릿 설명 검색"
        />

        <DialogFooter>
          <DialogClose asChild>
            <Button size="sm" type="button" variant="outline">
              취소
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
