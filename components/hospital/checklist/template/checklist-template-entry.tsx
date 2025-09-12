'use client'

// import PreviewDialog from '@/components/hospital/common/preview/preview-dialog'
// import { templateColumns } from '@/components/hospital/icu/main/template/template-columns'
import DataTable from '@/components/ui/data-table'
import { TemplateChecklist } from '@/types/checklist/checklist-type'
import { useState } from 'react'
import ChecklistPreviewDialog from '@/components/hospital/checklist/template//checklist-preview-dialog'
import UpsertChecklistTemplateDialog from '@/components/hospital/checklist/template/upsert-checklist-template-dialog'
import { ChecklistTemplate } from '@/types'
import { checklistTemplateColumns } from '@/components/hospital/checklist/template/checklist-template-columns'

export default function ChecklistTemplateEntry({
  checklistTemplateCharts,
}: {
  checklistTemplateCharts: TemplateChecklist[] | null
}) {
  const [templateDialogOpen, setTemplateDialogOpen] = useState(false)

  const [isEdit, setIsEdit] = useState(false)
  const [selectedTemplateChart, setSelectedTemplateChart] =
    useState<TemplateChecklist | null>(null)

  return (
    <div className="relative">
      <DataTable
        searchBarSpace
        columns={checklistTemplateColumns(
          setTemplateDialogOpen,
          setIsEdit,
          setSelectedTemplateChart,
        )}
        data={checklistTemplateCharts ?? []}
        searchPlaceHolder="템플릿 제목으로 검색"
      />

      <ChecklistPreviewDialog />

      <UpsertChecklistTemplateDialog
        useUpsertTemplateDialogOpen={templateDialogOpen}
        setUseUpsertTemplateDialogOpen={setTemplateDialogOpen}
        isEdit={isEdit}
        setIsEdit={setIsEdit}
        selectedTemplateChart={selectedTemplateChart}
        setSelectedTemplateChart={setSelectedTemplateChart}
      />
    </div>
  )
}
