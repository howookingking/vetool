'use client'

import PreviewDialog from '@/components/hospital/common/preview/preview-dialog'
import DataTable from '@/components/ui/data-table'
import { usePreviewDialogStore } from '@/lib/store/icu/preview-dialog'
import type { TemplateChart } from '@/types/icu/template'
import { bookmarkColumns } from '@/unused/bookmark/bookmark-columns'

export default function Bookmarks({
  bookmarkedChartData,
}: {
  bookmarkedChartData: TemplateChart[]
}) {
  const { isPreviewDialogOpen } = usePreviewDialogStore()

  return (
    <>
      <DataTable
        columns={bookmarkColumns}
        data={bookmarkedChartData || []}
        searchPlaceHolder="북마크 이름, 설명으로 검색"
      />
      {isPreviewDialogOpen && <PreviewDialog />}
    </>
  )
}
