'use client'

import PreviewDialog from '@/components/hospital/icu/common-dialogs/preview/preview-dialog'
import { templateColumns } from '@/components/hospital/icu/main/template/table/template-columns'
import DataTable from '@/components/ui/data-table'
import { type TemplateChart } from '@/types/icu/template'
import AddTemplateOrders from './add/add-template-orders'
import AddTemplateDialog from './add-template-dialog'

export default function IcuTemplateEntry({
  templateCharts,
}: {
  templateCharts: TemplateChart[]
}) {
  return (
    <div className="relative">
      <DataTable
        searchBarSpace
        columns={templateColumns}
        data={templateCharts ?? []}
        searchPlaceHolder="템플릿 이름, 설명, 환자명으로 검색"
      />

      <AddTemplateDialog />

      <PreviewDialog />

      {/* <EditTemplateDialogs /> */}
    </div>
  )
}
