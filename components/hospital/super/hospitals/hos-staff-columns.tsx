'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { type User } from '@/types'
import { type ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown, Stethoscope, UserIcon } from 'lucide-react'

export type HosStaffDataTable = Pick<
  User,
  'name' | 'position' | 'rank' | 'is_vet' | 'avatar_url'
>

export const hosStaffColumns: ColumnDef<HosStaffDataTable>[] = [
  {
    accessorKey: 'rank',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          순번
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
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
          이름
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const name = row.original.name
      const avatarUrl = row.original.avatar_url
      return (
        <div className="flex items-center justify-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src={avatarUrl ?? ''} alt="user avatar" />
            <AvatarFallback>{name.slice(0, 2)}</AvatarFallback>
          </Avatar>
          <span>{name}</span>
        </div>
      )
    },
  },
  {
    accessorKey: 'position',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          직책
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: 'is_vet',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          수의사
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const isVet = row.original.is_vet
      return (
        <div className="flex items-center justify-center gap-2">
          {isVet ? (
            <>
              <Stethoscope size={14} /> <span>수의사</span>
            </>
          ) : (
            <>
              <UserIcon size={14} /> <span>일반직원</span>
            </>
          )}
        </div>
      )
    },
  },
]
