'use client'

import { ColumnDef } from '@tanstack/react-table'
import type { AdminDietData } from '@/types/adimin'
import { Button } from '@/components/ui/button'
import { ArrowUpDown } from 'lucide-react'
import AddDietDialog from './add-diet-dialog'
import DeleteDietDialog from './delete-diet-dialog'

export const dietColumns: ColumnDef<AdminDietData>[] = [
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
      return (
        <div className="flex justify-center">
          <AddDietDialog dietData={adminDietData} isEdit />
        </div>
      )
    },
  },
  {
    id: 'delete',
    header: '삭제',

    cell: ({ row }) => {
      const dietProductId = row.original.diet_products_id
      const name = row.original.name

      return (
        <div className="flex justify-center">
          <DeleteDietDialog dietProductId={dietProductId} name={name} />
        </div>
      )
    },
  },
]
