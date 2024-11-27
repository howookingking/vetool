'use client'

import { ColumnDef } from '@tanstack/react-table'
import type { AdminDietData } from '@/types/adimin'
import { Button } from '@/components/ui/button'
import { ArrowUpDown } from 'lucide-react'
import AddDietDialog from './add-diet-dialog'
import DeleteDietDialog from './delete-diet-dialog'
import DietSpeciesIcon from './diet-species-icon'

export const dietColumns = (hosId: string): ColumnDef<AdminDietData>[] => [
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
      const dietHosId = adminDietData.hos_id

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
      const dietProductId = row.original.diet_products_id
      const name = row.original.name
      const dietHosId = row.original.hos_id

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
