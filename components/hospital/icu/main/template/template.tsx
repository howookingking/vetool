'use client'

import PreviewDialog from '@/components/hospital/icu/common-dialogs/preview/preview-dialog'
import { templateColumns } from '@/components/hospital/icu/main/template/table/template-columns'
import DataTable from '@/components/ui/data-table'
import { type TemplateChart } from '@/types/icu/template'

export default function Template({
  templateCharts,
}: {
  templateCharts: TemplateChart[]
}) {
  return (
    <>
      <DataTable
        columns={templateColumns}
        data={templateCharts ?? []}
        searchPlaceHolder="템플릿 이름, 설명, 환자명으로 검색"
      />

      <PreviewDialog />
      {/* <EditTemplateDialogs /> */}
    </>
  )
}
