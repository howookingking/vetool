import PreviewDialog from '@/components/hospital/common/preview/preview-dialog'
import { Button } from '@/components/ui/button'
import type { IcuTemplate } from '@/types'
import type { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDownIcon } from 'lucide-react'
import type { Dispatch, SetStateAction } from 'react'
import ConfirmPasteTemplateDialog from './confirm-paste-template-dialog'

export const pasteTemplateColumns = (
  setIsDialogOpen: Dispatch<SetStateAction<boolean>>,
  tableHeader?: boolean,
  chartId?: string,
  targetDate?: string,
  patientId?: string,
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
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          설명
          <ArrowUpDownIcon className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const comment = row.original.template_comment
      return <div>{comment ?? '없음'}</div>
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
    accessorKey: 'preview',
    header: '미리보기',
    cell: ({ row }) => {
      const chartId = row.original.icu_chart_id

      return (
        <PreviewDialog
          isTemplate
          chartId={chartId}
          patientId={null}
          targetDate={null}
        />
      )
    },
  },
  {
    accessorKey: 'action',
    header: '선택',
    cell: ({ row }) => {
      const templateChartId = row.original.icu_chart_id
      return (
        <ConfirmPasteTemplateDialog
          templateChartId={templateChartId}
          setIsDialogOpen={setIsDialogOpen}
          tableHeader={tableHeader}
          chartId={chartId}
          targetDate={targetDate}
          patientId={patientId}
        />
      )
    },
  },
]
