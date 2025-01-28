import PreviewButton from '@/components/hospital/common/preview/preview-button'
import { Button } from '@/components/ui/button'
import { type TemplateChart } from '@/types/icu/template'
import { type ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown } from 'lucide-react'
import { type Dispatch, type SetStateAction } from 'react'
import PasteTemplateButton from './paste-template-button'

export const templateColumns = (
  setIsDialogOpen: Dispatch<SetStateAction<boolean>>,
  tableHeader?: boolean,
  chartId?: string,
): ColumnDef<TemplateChart>[] => [
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
    accessorKey: 'preview',
    header: '미리보기',
    cell: ({ row }) => {
      const chartId = row.original.icu_chart_id

      return <PreviewButton chartId={chartId} isTemplate />
    },
  },
  {
    accessorKey: 'action',
    header: '선택',
    cell: ({ row }) => {
      const templateChartId = row.original.icu_chart_id
      return (
        <PasteTemplateButton
          templateChartId={templateChartId}
          setIsDialogOpen={setIsDialogOpen}
          tableHeader={tableHeader}
          chartId={chartId}
        />
      )
    },
  },
]
