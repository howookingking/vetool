'use client'

import PreviewDialog from '@/components/hospital/icu/common-dialogs/preview/preview-dialog'
import { bookmarkColumns } from '@/components/hospital/icu/main/bookmark/bookmark-columns'
import DataTable from '@/components/ui/data-table'
import { usePreviewDialogStore } from '@/lib/store/icu/preview-dialog'
import type { TemplateChart } from '@/types/icu/template'

export default function Bookmarks({
  bookmarkedChartData,
}: {
  bookmarkedChartData: TemplateChart[]
}) {
  const { isPreviewDialogOpen } = usePreviewDialogStore()

  return (
    <div className="p-2">
      <DataTable
        columns={bookmarkColumns}
        data={bookmarkedChartData || []}
        searchPlaceHolder="북마크 이름, 설명으로 검색"
      />
      {isPreviewDialogOpen && <PreviewDialog />}
    </div>
  )
}
