'use client'

import { ApprovalColumn } from '@/components/hospital/admin/approval/approval-column'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { formatTimestamp } from '@/lib/utils/utils'
import type { User, UserApproval } from '@/types'
import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown, Stethoscope, User as UserIcon } from 'lucide-react'

export type ApprovalDataTable = Omit<
  UserApproval,
  'user_id' | 'hos_id' | 'user_approval_id'
> &
  Pick<User, 'user_id' | 'name' | 'avatar_url' | 'is_vet'>

export const approvlaColumns: ColumnDef<ApprovalDataTable>[] = [
  {
    accessorKey: 'name',
    header: () => <>요청인</>,
    cell: ({ row }) => {
      const avatarUrl = row.original.avatar_url
      const name = row.original.name
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
    accessorKey: 'is_vet',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          <Stethoscope />
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
  {
    accessorKey: 'created_at',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          요청일시
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const created_at = row.original.created_at

      return <span>{formatTimestamp(created_at)}</span>
    },
  },
  {
    accessorKey: 'updated_at',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          승인일시
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const updatedAt = row.original.updated_at

      return <span>{updatedAt ? formatTimestamp(updatedAt) : '미승인'} </span>
    },
  },

  {
    id: 'approval_action',
    cell: ({ row }) => {
      const userId = row.original.user_id
      const name = row.original.name
      const isApproved = row.original.is_approved

      return (
        <ApprovalColumn userId={userId} name={name} isApproved={isApproved} />
      )
    },
  },
]
