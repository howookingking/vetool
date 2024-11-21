'use client'

import { DeleteUserColumn } from '@/components/hospital/admin/staff/delete-user-column'
import { GroupListDialog } from '@/components/hospital/admin/staff/goup-list-dialog'
import GroupColumn from '@/components/hospital/admin/staff/group-column'
import IsAdminColumn from '@/components/hospital/admin/staff/is-admin-column'
import IsVetColumn from '@/components/hospital/admin/staff/is-vet-column'
import PositionColumn from '@/components/hospital/admin/staff/position-column'
import RankColumn from '@/components/hospital/admin/staff/rank-column'
import { Button } from '@/components/ui/button'
import { HospitalUserDataTable } from '@/types/adimin'
import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown } from 'lucide-react'
import NameColumn from './name-column'

export const staffColumns: ColumnDef<HospitalUserDataTable>[] = [
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
    cell: ({ row }) => {
      const rank = row.original.rank
      const userId = row.original.user_id
      return <RankColumn rank={rank} userId={userId} />
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
      const userId = row.original.user_id
      return <NameColumn avatarUrl={avatarUrl} name={name} userId={userId} />
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
    cell: ({ row }) => {
      const position = row.original.position
      const userId = row.original.user_id
      return <PositionColumn position={position} userId={userId} />
    },
  },
  {
    accessorKey: 'group',
    header: ({ table }) => {
      const groupList = table.getRow('0').original.group_list
      return (
        <div className="mx-auto flex w-20 items-center justify-center gap-2">
          그룹
          <GroupListDialog groupList={groupList} />
        </div>
      )
    },
    cell: ({ row }) => {
      const group = row.original.group
      const groupList = row.original.group_list
      const userId = row.original.user_id
      const name = row.original.name
      return (
        <GroupColumn
          userId={userId}
          group={group}
          groupList={groupList}
          name={name}
        />
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
      const userId = row.original.user_id
      return <IsVetColumn isVet={isVet} userId={userId} />
    },
  },
  {
    accessorKey: 'is_admin',
    header: ({ column, table }) => {
      const isMaster = table.getRow('0').original.isMaster

      // if (!isMaster) {
      //   return null
      // }

      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          관리자
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const isAdmin = row.original.is_admin
      const userId = row.original.user_id
      // const isMaster = row.original.isMaster
      const masterUserId = row.original.master_user_id

      // if (!isMaster) {
      //   return null
      // }

      return (
        <IsAdminColumn
          isAdmin={isAdmin}
          userId={userId}
          masterUserId={masterUserId}
        />
      )
    },
  },
  {
    id: 'delete-user',
    cell: ({ row }) => {
      const name = row.original.name
      const userId = row.original.user_id
      const isMaster = row.original.isMaster
      const masterUserId = row.original.master_user_id

      // if (!isMaster) {
      //   return null
      // }

      return (
        <DeleteUserColumn
          name={name}
          userId={userId}
          isMaster={isMaster}
          masterUserId={masterUserId}
        />
      )
    },
  },
]
