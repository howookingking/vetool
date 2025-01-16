'use client'

import { ConfirmCopyDialog } from '@/components/hospital/icu/common-dialogs/confirm-copy-dialog'
import PreviewDialog from '@/components/hospital/icu/common-dialogs/preview/preview-dialog'
import { pasteTemplateColumns } from '@/components/hospital/icu/main/chart/add-chart-dialogs/template/paste-template-columns'
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
import { getTemplateCharts } from '@/lib/services/icu/template/template'
import { useCopiedChartStore } from '@/lib/store/icu/copied-chart'
import { usePreviewDialogStore } from '@/lib/store/icu/preview-dialog'
import type { TemplateChart } from '@/types/icu/template'
import { Bookmark, LoaderCircle } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import { useState } from 'react'

export default function AddTemplateOrderDialog() {
  const { isPreviewDialogOpen } = usePreviewDialogStore()
  const { isConfirmCopyDialogOpen } = useCopiedChartStore()
  const { hos_id } = useParams()
  const { refresh } = useRouter()
  const [templateCharts, setTemplateCharts] = useState<TemplateChart[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleOpenTemplateDialog = async () => {
    setIsLoading(true)

    // icu_templates에 존재하는 차트를 우선 가져옴
    const chartData = await getTemplateCharts(hos_id as string)

    setTemplateCharts(
      chartData?.filter((chart) => !chart.patient.patient_id) ?? [],
    )

    setIsLoading(false)
    setIsDialogOpen(!isDialogOpen)
    refresh()
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <Button
        variant="outline"
        className="hidden h-1/3 w-full items-center justify-center gap-2 md:flex md:h-1/3 md:w-2/3 lg:w-1/2"
        onClick={handleOpenTemplateDialog}
        disabled={isLoading}
      >
        <Bookmark size={20} />
        <span>템플릿 선택</span>
        {isLoading && <LoaderCircle className="ml-2 h-4 w-4 animate-spin" />}
      </Button>

      <DialogContent className="md:max-w-[1040px]">
        <DialogHeader>
          <DialogTitle>템플릿 붙여넣기</DialogTitle>
          <DialogDescription>복사할 템플릿을 선택해주세요</DialogDescription>
        </DialogHeader>

        <DataTable
          columns={pasteTemplateColumns}
          data={templateCharts ?? []}
          rowLength={6}
          searchPlaceHolder="템플릿 이름 · 템플릿 설명 검색"
        />

        {isPreviewDialogOpen && <PreviewDialog />}
        {isConfirmCopyDialogOpen && (
          <ConfirmCopyDialog setTemplateDialogOpen={setIsDialogOpen} />
        )}

        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="outline">
              취소
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
