'use client'

import { Button } from '@/components/ui/button'
import { ChecklistData } from '@/types/checklist/checklist-type'
import { type ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown, Check } from 'lucide-react'
import { Checklist } from '@/types'
import { type DebouncedState } from 'use-debounce'
import ChecklistSearchPreviewButton from './checklist-search-preview-button'
import ChecklistSearchCopyButton from './checklist-search-copy-button'
import { useParams, useRouter } from 'next/navigation'
import ChecklistSearchMoveToChartButton from './checklist-search-movetochart-button'
// import EditTemplateButton from './edit-template-button'

type Props = {
  //   setSearchedChecklist: Dispatch<SetStateAction<Checklist | null>>
  debouncedSearch: DebouncedState<() => Promise<void>>
}
export const SearchedChecklistColumns = ({
  debouncedSearch,
}: Props): ColumnDef<Checklist>[] => [
  {
    accessorKey: 'checklist_title',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Title
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
          환자정보
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const signalment = row.original.checklist_tag?.split('#')
      return (
        <div className="flex justify-center">
          {signalment && signalment[4] + '(' + signalment[5] + ')'}
        </div>
      )
    },
  },
  {
    accessorKey: 'due_date',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          날짜
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      //   const createdAt = row.original.created_at

      return <span>{row.original.due_date}</span>
    },
  },
  {
    accessorKey: 'state',
    header: ({ column }) => {
      return <Button variant="ghost">상태</Button>
    },
    cell: ({ row }) => {
      //   const createdAt = row.original.created_at
      const state =
        row.original.starttime && row.original.endtime
          ? '완료'
          : row.original.starttime
            ? '진행중'
            : '대기중'
      return (
        <span
          className={
            state === '진행중'
              ? 'text-green-500'
              : state === '대기중'
                ? 'text-yellow-500'
                : ''
          }
        >
          {state}
        </span>
      )
    },
  },

  {
    id: 'preview',
    header: '미리보기',
    cell: ({ row }) => {
      const chart = row.original
      const checklistreport = { ...chart } as ChecklistData

      return (
        <div className="flex justify-center">
          <ChecklistSearchPreviewButton chart={checklistreport} />
        </div>
      )
    },
  },
  {
    id: 'delete',
    header: '복사',
    cell: ({ row }) => {
      const chart = row.original

      return (
        <div className="flex justify-center">
          <ChecklistSearchCopyButton chart={chart} isTemplate={false} />
        </div>
      )
    },
  },
  {
    id: 'select',
    header: '이동',
    cell: ({ row }) => {
      return <ChecklistSearchMoveToChartButton checklistchart={row.original} />
    },
  },
]
