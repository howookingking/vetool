'use client'

// import PreviewDialog from '@/components/hospital/common/preview/preview-dialog'
// import { templateColumns } from '@/components/hospital/icu/main/template/template-columns'
import DataTable from '@/components/ui/data-table'
import { TemplateChecklist } from '@/types/checklist/checklist-type'

import type { TemplateChart } from '@/types/icu/template'
import { useState } from 'react'
import ChecklistPreviewDialog from './checklist-preview-dialog'
import UpsertChecklistTemplateDialog from './upsert-checklist-template-dialog'

export default function ChecklistTemplateEntry({
  templateChecklists,
}: {
  templateChecklists: TemplateChecklist[]
}) {
  const [templateDialogOpen, setTemplateDialogOpen] = useState(false)

  const [isEdit, setIsEdit] = useState(false)
  const [selectedTemplateChart, setSelectedTemplateChart] =
    useState<TemplateChecklist | null>(null)

  return (
    <div className="relative">
      {/* <DataTable
        searchBarSpace
        columns={templateColumns(
          setTemplateDialogOpen,
          setSortedOrders,
          setIsEdit,
          setSelectedTemplateChart,
        )}
        data={templateCharts ?? []}
        searchPlaceHolder="템플릿 이름, 설명으로 검색"
      /> */}

      <ChecklistPreviewDialog />

      <UpsertChecklistTemplateDialog
        useUpsertTemplateDialogOpen={templateDialogOpen}
        setUseUpsertTemplateDialogOpen={setTemplateDialogOpen}
        // sortedOrders={sortedOrders}
        // setSortedOrders={setSortedOrders}
        isEdit={isEdit}
        setIsEdit={setIsEdit}
        // selectedTemplateChart={selectedTemplateChart}
        // setSelectedTemplateChart={setSelectedTemplateChart}
      />
    </div>
  )
}
