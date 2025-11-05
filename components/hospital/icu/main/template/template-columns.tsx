'use client'

import DeleteTemplateDialog from '@/components/hospital/icu/main/template/delete-template-dialog'
import { Button } from '@/components/ui/button'
import type { IcuTemplate } from '@/types'
import type { SelectedIcuOrder } from '@/types/icu/chart'
import type { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown } from 'lucide-react'
import type { Dispatch, SetStateAction } from 'react'
import EditTemplateButton from './edit-template-button'
import PreviewDialog from '@/components/hospital/common/preview/preview-dialog'

export const templateColumns = (
  setTemplateDialogOpen: Dispatch<SetStateAction<boolean>>,
  setSortedOrders: Dispatch<SetStateAction<SelectedIcuOrder[]>>,
  setIsEdtit: Dispatch<SetStateAction<boolean>>,
  setSelectedTemplateChart: Dispatch<SetStateAction<IcuTemplate | null>>,
): ColumnDef<IcuTemplate>[] => [
  {
    accessorKey: 'template_name',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          템플릿 이름
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: 'template_comment',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          설명
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
          생성일
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const createdAt = row.original.created_at

      return <span>{createdAt.slice(0, 10)}</span>
    },
  },

  {
    id: 'preview',
    header: '미리보기',
    cell: ({ row }) => {
      const chartId = row.original.icu_chart_id

      return (
        <PreviewDialog
          chartId={chartId}
          isTemplate
          patientId={null}
          targetDate={null}
        />
      )
    },
  },
  {
    id: 'action',
    header: '수정',
    cell: ({ row }) => {
      const chartId = row.original.icu_chart_id
      const template = row.original

      return (
        <EditTemplateButton
          setUseUpsertTemplateDialogOpen={setTemplateDialogOpen}
          chartId={chartId}
          template={template}
          setSortedOrders={setSortedOrders}
          setIsEdtit={setIsEdtit}
          setSelectedTemplateChart={setSelectedTemplateChart}
        />
      )
    },
  },
  {
    id: 'delete',
    header: '삭제',
    cell: ({ row }) => {
      const chartId = row.original.icu_chart_id

      return (
        <div className="flex justify-center">
          <DeleteTemplateDialog
            templateName={row.original.template_name}
            chartId={chartId}
          />
        </div>
      )
    },
  },
]
