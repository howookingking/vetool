'use client'

import LargeLoaderCircle from '@/components/common/large-loader-circle'
import PreviewDialog from '@/components/hospital/icu/common-dialogs/preview/preview-dialog'
import DataTable from '@/components/ui/data-table'
import { getTemplateCharts } from '@/lib/services/icu/template/template'
import { usePreviewDialogStore } from '@/lib/store/icu/preview-dialog'
import { useTemplateStore } from '@/lib/store/icu/template'
import { TemplateChart } from '@/types/icu/template'
import { useEffect, useState } from 'react'
import ConfirmCopyTemplateOrderDialog from './confirm-copy-template-order-dialog'
import { templateOrderColumns } from './template-order-columns'

export default function TemplateTabContent({
  hosId,
  icuChartId,
}: {
  hosId: string
  icuChartId: string
}) {
  const [templateCharts, setTemplateCharts] = useState<TemplateChart[] | null>(
    null,
  )
  const { isPreviewDialogOpen } = usePreviewDialogStore()
  const { isTemplateDialogOpen } = useTemplateStore()

  useEffect(() => {
    const fetchTemplateData = async () => {
      const templateChartData = await getTemplateCharts(hosId)
      setTemplateCharts(templateChartData ?? [])
    }
    fetchTemplateData()
  }, [hosId])

  if (!templateCharts) {
    return <LargeLoaderCircle className="h-[400px]" />
  }

  return (
    <>
      <DataTable
        columns={templateOrderColumns}
        data={templateCharts}
        searchPlaceHolder="템플릿 이름, 설명, 환자명으로 검색"
        rowLength={5}
      />

      {isTemplateDialogOpen && (
        <ConfirmCopyTemplateOrderDialog icuChartId={icuChartId} />
      )}
      {isPreviewDialogOpen && <PreviewDialog />}
    </>
  )
}
