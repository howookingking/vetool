'use client'

import { Button } from '@/components/ui/button'
import type { AdminDietData } from '@/types/adimin'
import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown } from 'lucide-react'
import AddDietDialog from './add-diet-dialog'
import DeleteDietDialog from './delete-diet-dialog'
import DietSpeciesIcon from './diet-species-icon'
import PinButton from './pin-button'

export const dietColumns = ({
  hosId,
  pinnedDietsIds,
  isMine = false,
}: {
  hosId: string
  pinnedDietsIds: string[]
  isMine?: boolean
}): ColumnDef<AdminDietData>[] => [
  {
    accessorKey: 'pinned',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          {isMine ? '병원명' : ' 병원사료등록'}
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const dietProductId = row.original.diet_id
      const isPinned = pinnedDietsIds.includes(dietProductId)
      const hosName = row.original.hos_id.name

      if (isMine) {
        return <span>{hosName}</span>
      }

      return (
        <PinButton
          isPinned={isPinned}
          dietProductid={dietProductId}
          isMine={isMine}
        />
      )
    },
  },
  {
    accessorKey: 'name',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          사료명
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: 'description',
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
    accessorKey: 'company',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          제조사
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: 'species',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          종
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const species = row.original.species

      return (
        <div className="flex h-[36px] items-center justify-center">
          <DietSpeciesIcon species={species ?? 'both'} />
        </div>
      )
    },
  },
  {
    accessorKey: 'unit',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          단위
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: 'mass_vol',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          단위당 칼로리
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    id: 'edit',
    header: '수정',
    cell: ({ row }) => {
      const adminDietData = row.original
      const dietHosId = adminDietData.hos_id.hos_id

      return (
        <div className="flex justify-center">
          {dietHosId === hosId && (
            <AddDietDialog dietData={adminDietData} isEdit />
          )}
        </div>
      )
    },
  },
  {
    id: 'delete',
    header: '삭제',
    cell: ({ row }) => {
      const dietProductId = row.original.diet_id
      const name = row.original.name
      const dietHosId = row.original.hos_id.hos_id

      return (
        <div className="flex justify-center">
          {dietHosId === hosId && (
            <DeleteDietDialog dietProductId={dietProductId} name={name} />
          )}
        </div>
      )
    },
  },
]
