'use client'

import HosUserSheet from '@/components/hospital/super/hospitals/hos-user-sheet'
import { Button } from '@/components/ui/button'
import { HospitalList } from '@/lib/services/hospital-home/home'
import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown } from 'lucide-react'

export const hosListColumns: ColumnDef<HospitalList>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          병원명
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const name = row.original.name
      return <span>{name ?? '-'}</span>
    },
  },
  {
    accessorKey: 'city',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          지역
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: 'district',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          시·군·구
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: 'plan',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          플랜
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const plan = row.original.plan
      return <span>{plan ?? '-'}</span>
    },
  },
  {
    id: 'action',
    header: '직원 목록',
    cell: ({ row }) => {
      const hosId = row.original.hos_id
      const hosName = row.original.name

      return (
        <div className="flex justify-center">
          <HosUserSheet hosId={hosId} hosName={hosName} />
        </div>
      )
    },
  },
]
