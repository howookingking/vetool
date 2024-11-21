'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import type { UserHospitalJoined } from '@/types/adimin'
import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown } from 'lucide-react'

export const staffColumns: ColumnDef<UserHospitalJoined>[] = [
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
    accessorKey: 'group',
    header: () => {
      return <span>그룹</span>
    },
    cell: ({ row }) => {
      const group = row.original.group

      return (
        <ul className="flex flex-wrap items-center justify-center gap-1">
          {group?.map((item) => (
            <li key={item}>
              <Badge className="flex cursor-pointer gap-1">{item}</Badge>
            </li>
          ))}
        </ul>
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

      return <span>{isVet ? 'O' : 'X'}</span>
    },
  },
]
