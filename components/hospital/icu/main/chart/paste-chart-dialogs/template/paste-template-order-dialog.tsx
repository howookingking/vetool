'use client'

import PreviewDialog from '@/components/hospital/common/preview/preview-dialog'
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
import { type TemplateChart } from '@/types/icu/template'
import { Bookmark, LoaderCircle } from 'lucide-react'
import { useParams } from 'next/navigation'
import { useState } from 'react'
import { templateColumns } from './template-columns'

type PasteTemplateOrderDialogProps = {
  tableHeader?: boolean
  chartId?: string
}

export default function PasteTemplateOrderDialog({
  tableHeader,
  chartId,
}: PasteTemplateOrderDialogProps) {
  const { hos_id } = useParams()

  const [templateCharts, setTemplateCharts] = useState<TemplateChart[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleOpenTemplateDialog = async () => {
    setIsLoading(true)

    const templateCharts = await getTemplateCharts(hos_id as string)
    setTemplateCharts(templateCharts)

    setIsLoading(false)
    setIsDialogOpen(!isDialogOpen)
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      {tableHeader ? (
        <Button
          size="icon"
          variant="ghost"
          className="hidden shrink-0 md:block"
          onClick={handleOpenTemplateDialog}
          disabled={isLoading}
        >
          {isLoading ? <LoaderCircle className="animate-spin" /> : <Bookmark />}
        </Button>
      ) : (
        <Button
          variant="outline"
          className="justify-centeritems-center hidden h-1/3 w-full items-center justify-center gap-2 md:flex md:h-1/3 md:w-2/3 lg:w-1/2"
          onClick={handleOpenTemplateDialog}
          disabled={isLoading}
        >
          <Bookmark size={20} />

          {!tableHeader && <span>템플릿 붙여넣기</span>}
          {isLoading && <LoaderCircle className="ml-2 h-4 w-4 animate-spin" />}
        </Button>
      )}

      <DialogContent className="md:max-w-[1200px]">
        <DialogHeader>
          <DialogTitle>템플릿 붙여넣기</DialogTitle>
          <DialogDescription>붙여넣을 템플릿을 선택해주세요</DialogDescription>
        </DialogHeader>

        <DataTable
          columns={templateColumns(setIsDialogOpen, tableHeader, chartId)}
          data={templateCharts ?? []}
          searchPlaceHolder="템플릿 이름 · 템플릿 설명 검색"
        />

        <PreviewDialog />

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
