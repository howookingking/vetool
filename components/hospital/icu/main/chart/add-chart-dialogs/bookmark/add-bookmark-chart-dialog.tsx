'use client'

import LargeLoaderCircle from '@/components/common/large-loader-circle'
import { ConfirmCopyDialog } from '@/components/hospital/icu/common-dialogs/confirm-copy-dialog'
import PreviewDialog from '@/components/hospital/icu/common-dialogs/preview/preview-dialog'
import { pasteBookmarkColumns } from '@/components/hospital/icu/main/chart/add-chart-dialogs/bookmark/paste-bookmark-columns'
import { Button } from '@/components/ui/button'
import DataTable from '@/components/ui/data-table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

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
import { LoaderCircle, Star } from 'lucide-react'
import { useParams } from 'next/navigation'
import { useState } from 'react'

export default function AddBookmarkChartDialog() {
  const { isPreviewDialogOpen } = usePreviewDialogStore()
  const { isConfirmCopyDialogOpen } = useCopiedChartStore()
  const { hos_id } = useParams()

  const [bookmarkCharts, setBookmarkCharts] = useState<TemplateChart[]>([])
  const [templateCharts, setTemplateCharts] = useState<TemplateChart[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleOpenTemplateDialog = async () => {
    setIsLoading(true)

    if (bookmarkCharts?.length === 0) {
      // icu_templates에 존재하는 차트를 우선 가져옴
      const chartData = await getTemplateCharts(hos_id as string)

      // 북마크 차트 - 템플릿 오더로 구분함
      setBookmarkCharts(chartData.filter((chart) => chart.patient.patient_id))
      setTemplateCharts(chartData.filter((chart) => !chart.patient.patient_id))
    }

    setIsLoading(false)
    setIsDialogOpen(!isDialogOpen)
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <Button
        variant="outline"
        className="hidden h-[200px] w-full items-center justify-center gap-2 md:flex md:h-1/3 md:w-1/4"
        onClick={handleOpenTemplateDialog}
        disabled={isLoading}
      >
        <Star size={20} />
        <span>북마크 / 템플릿 선택</span>
        {isLoading && <LoaderCircle className="ml-2 h-4 w-4 animate-spin" />}
      </Button>

      <DialogContent className="md:max-w-[1040px]">
        <DialogHeader>
          <DialogTitle>북마크 / 템플릿 붙여넣기</DialogTitle>
          <DialogDescription>복사할 차트를 선택해주세요</DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="bookmark">
          <TabsList className="grid grid-cols-2">
            <TabsTrigger value="bookmark">북마크 차트</TabsTrigger>
            <TabsTrigger value="template">템플릿 오더</TabsTrigger>
          </TabsList>

          {/* 오더 직접 추가 (기본값) */}
          <TabsContent value="bookmark">
            {isLoading ? (
              <LargeLoaderCircle className="h-96" />
            ) : (
              <DataTable
                columns={pasteBookmarkColumns}
                data={bookmarkCharts ?? []}
                rowLength={6}
                searchPlaceHolder="북마크 이름 · 북마크 설명 · 환자명 검색"
              />
            )}
          </TabsContent>

          {/* 템플릿 오더 추가 */}
          <TabsContent value="template">
            <DataTable
              columns={pasteBookmarkColumns}
              data={templateCharts ?? []}
              rowLength={6}
              searchPlaceHolder="템플릿 이름 · 템플릿 설명 검색"
            />
          </TabsContent>
        </Tabs>

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
