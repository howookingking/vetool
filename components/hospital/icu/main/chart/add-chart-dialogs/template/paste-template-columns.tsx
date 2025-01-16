'use client'

import PreviewButton from '@/components/hospital/icu/common-dialogs/preview/preview-button'
import PasteTemplateButton from '@/components/hospital/icu/main/chart/add-chart-dialogs/template/paste-template-button'
import { Button } from '@/components/ui/button'
import { TemplateChart } from '@/types/icu/template'
import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown } from 'lucide-react'

export const pasteTemplateColumns: ColumnDef<TemplateChart>[] = [
  {
    accessorKey: 'template_name',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          제목
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
    cell: ({ row }) => {
      const comment = row.original.template_comment
      return <div>{comment ?? '없음'}</div>
    },
  },
  {
    accessorKey: 'target_date',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          차트 생성일
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const targetDate = row.original.target_date
      return <span>{targetDate}</span>
    },
  },

  {
    accessorKey: 'preview',
    header: '미리보기',
    cell: ({ row }) => {
      const patientId = row.original.patient.patient_id
      const targetDate = row.original.target_date
      const chartId = row.original.icu_chart_id

      return (
        <PreviewButton
          patientId={patientId}
          targetDate={targetDate}
          chartId={chartId}
        />
      )
    },
  },
  {
    accessorKey: 'action',
    header: '선택',
    cell: ({ row }) => {
      const chartId = row.original.icu_chart_id
      return <PasteTemplateButton chartId={chartId} />
    },
  },
]
