'use client'

import PreviewButton from '@/components/hospital/icu/common-dialogs/preview/preview-button'
import EditTemplateButton from '@/components/hospital/icu/main/template/edit/edit-template-button'
import DeleteTemplateDialog from '@/components/hospital/icu/main/template/table/delete-template-dialog'
import { Button } from '@/components/ui/button'
import type { TemplateChart } from '@/types/icu/template'
import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown } from 'lucide-react'

export const templateColumns: ColumnDef<TemplateChart>[] = [
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

      return <span>{createdAt.slice(0, 10)}</span>
    },
  },

  {
    id: 'preview',
    header: '미리보기',
    cell: ({ row }) => {
      const chartId = row.original.icu_chart_id

      return (
        <div className="flex justify-center">
          <PreviewButton chartId={chartId} isTemplate />
        </div>
      )
    },
  },
  // {
  //   id: 'action',
  //   header: '수정',
  //   cell: ({ row }) => {
  //     const chartId = row.original.icu_chart_id
  //     const templateName = row.original.template_name
  //     const templateComment = row.original.template_comment
  //     const templateId = row.original.template_id

  //     return (
  //       <div className="flex justify-center">
  //         <EditTemplateButton
  //           chartId={chartId}
  //           templateId={templateId}
  //           templateName={templateName}
  //           templateComment={templateComment}
  //         />
  //       </div>
  //     )
  //   },
  // },
  {
    id: 'delete',
    header: '삭제',
    cell: ({ row }) => {
      const chartId = row.original.icu_chart_id

      return (
        <div className="flex justify-center">
          <DeleteTemplateDialog
            templateId={row.original.template_id}
            templateName={row.original.template_name}
            chartId={chartId}
          />
        </div>
      )
    },
  },
]
