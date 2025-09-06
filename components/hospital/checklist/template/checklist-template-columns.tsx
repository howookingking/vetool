'use client'

import { Button } from '@/components/ui/button'
import { TemplateChecklist } from '@/types/checklist/checklist-type'
import { type ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown, Check } from 'lucide-react'
import { type Dispatch, type SetStateAction } from 'react'
import EditChecklilstTemplateButton from '@/components/hospital/checklist/template/edit-checklist-template-button'
import ChecklistTemplatePreviewButton from '@/components/hospital/checklist/template/checklist-template-preview-button'
import DeleteChecklistTemplateDialog from '@/components/hospital/checklist/template/delete-checklist-template-dialog'
import RegistChecklistByTemplateDialog from './regist-checklist-by-template-dialog'
// import EditTemplateButton from './edit-template-button'

export const checklistTemplateColumns = (
  setTemplateDialogOpen: Dispatch<SetStateAction<boolean>>,
  setIsEdtit: Dispatch<SetStateAction<boolean>>,
  setSelectedTemplateChart: Dispatch<SetStateAction<TemplateChecklist | null>>,
): ColumnDef<TemplateChecklist>[] => [
  {
    accessorKey: 'checklist_title',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          탬플릿 이름
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: 'checklist_tag',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Tag
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: 'created_at',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          템플릿 생성일
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const createdAt = row.original.created_at

      return <span>{createdAt ? createdAt.slice(0, 10) : '-'}</span>
    },
  },

  {
    id: 'preview',
    header: '미리보기',
    cell: ({ row }) => {
      const chart = row.original

      return (
        <div className="flex justify-center">
          <ChecklistTemplatePreviewButton chart={chart} isTemplate />
        </div>
      )
    },
  },
  {
    id: 'action',
    header: '수정',
    cell: ({ row }) => {
      const chartId = row.original.checklist_template_id
      const template = row.original

      return (
        <div className="flex justify-center">
          <EditChecklilstTemplateButton
            setUseUpsertTemplateDialogOpen={setTemplateDialogOpen}
            chartId={chartId}
            template={template}
            setIsEdtit={setIsEdtit}
            setSelectedTemplateChart={setSelectedTemplateChart}
          />
        </div>
      )
    },
  },
  {
    id: 'delete',
    header: '삭제',
    cell: ({ row }) => {
      const chartId = row.original.checklist_template_id

      return (
        <div className="flex justify-center">
          <DeleteChecklistTemplateDialog
            templateName={row.original.checklist_title}
            chartId={chartId}
          />
        </div>
      )
    },
  },
  {
    id: 'select',
    header: '선택',
    cell: ({ row }) => {
      return (
        <div className="flex justify-center">
          <RegistChecklistByTemplateDialog
            templatechecklistchart={row.original}
          />
        </div>
      )
    },
  },
]
