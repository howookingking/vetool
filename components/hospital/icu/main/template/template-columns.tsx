'use client'

import PreviewDialog from '@/components/hospital/common/preview/preview-dialog'
import DeleteTemplateDialog from '@/components/hospital/icu/main/template/delete-template-dialog'
import { Button } from '@/components/ui/button'
import type { IcuTemplate } from '@/types'
import type { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDownIcon } from 'lucide-react'
import UpsertTemplateDialog from './upsert-template-dialog'

export const templateColumns = (hosId: string): ColumnDef<IcuTemplate>[] => [
  {
    accessorKey: 'template_name',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          size="default"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          템플릿 이름
          <ArrowUpDownIcon className="ml-2 h-4 w-4" />
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
          size="default"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          설명
          <ArrowUpDownIcon className="ml-2 h-4 w-4" />
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
          size="default"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          생성일
          <ArrowUpDownIcon className="ml-2 h-4 w-4" />
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
    size: 50,
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
    size: 50,
    cell: ({ row }) => {
      const template = row.original

      return (
        <UpsertTemplateDialog hosId={hosId} template={template} isEdit={true} />
      )
    },
  },
  {
    id: 'delete',
    header: '삭제',
    size: 50,
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
