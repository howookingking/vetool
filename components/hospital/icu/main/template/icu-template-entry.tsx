'use client'

import PreviewDialog from '@/components/hospital/common/preview/preview-dialog'
import { templateColumns } from '@/components/hospital/icu/main/template/template-columns'
import DataTable from '@/components/ui/data-table'
import type { SelectedIcuOrder } from '@/types/icu/chart'
import type { TemplateChart } from '@/types/icu/template'
import { useState } from 'react'
import UpsertTemplateDialog from './upsert-template-dialog'

export default function IcuTemplateEntry({
  templateCharts,
}: {
  templateCharts: TemplateChart[]
}) {
  const [templateDialogOpen, setTemplateDialogOpen] = useState(false)
  const [sortedOrders, setSortedOrders] = useState<SelectedIcuOrder[]>([])
  const [isEdit, setIsEdit] = useState(false)
  const [selectedTemplateChart, setSelectedTemplateChart] =
    useState<TemplateChart | null>(null)

  return (
    <div className="relative">
      <DataTable
        searchBarSpace
        columns={templateColumns(
          setTemplateDialogOpen,
          setSortedOrders,
          setIsEdit,
          setSelectedTemplateChart,
        )}
        data={templateCharts ?? []}
        searchPlaceHolder="템플릿 이름, 설명으로 검색"
      />

      <PreviewDialog />

      <UpsertTemplateDialog
        useUpsertTemplateDialogOpen={templateDialogOpen}
        setUseUpsertTemplateDialogOpen={setTemplateDialogOpen}
        sortedOrders={sortedOrders}
        setSortedOrders={setSortedOrders}
        isEdit={isEdit}
        setIsEdit={setIsEdit}
        selectedTemplateChart={selectedTemplateChart}
        setSelectedTemplateChart={setSelectedTemplateChart}
      />
    </div>
  )
}
