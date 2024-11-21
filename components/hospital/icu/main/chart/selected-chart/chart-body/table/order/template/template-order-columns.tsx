'use client'

import PreviewButton from '@/components/hospital/icu/common-dialogs/preview/preview-button'
import { Button } from '@/components/ui/button'
import type { TemplateChart } from '@/types/icu/template'
import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown } from 'lucide-react'
import PasteTemplateOrderButton from './paste-template-order-button'

export const templateOrderColumns: ColumnDef<TemplateChart>[] = [
  {
    accessorKey: 'template_name',
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
  },
  {
    accessorKey: 'patient.name',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          환자명
        </Button>
      )
    },
    cell: ({ row }) => {
      const patientName = row.original.patient.name
      return <span>{patientName ?? '-'}</span>
    },
  },

  {
    id: 'preview',
    header: '미리보기',
    cell: ({ row }) => {
      const chartId = row.original.icu_chart_id
      const targetDate = row.original.target_date
      const patientId = row.original.patient.patient_id

      return (
        <div className="flex justify-center">
          <PreviewButton
            chartId={chartId}
            patientId={patientId}
            targetDate={targetDate}
          />
        </div>
      )
    },
  },
  {
    id: 'action',
    header: '선택',
    cell: ({ row }) => {
      const icuChartId = row.original.icu_chart_id

      return (
        <div className="flex justify-center">
          <PasteTemplateOrderButton icuChartId={icuChartId} />
        </div>
      )
    },
  },
]
