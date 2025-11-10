'use client'

import type { SelectHosDataTable } from '@/lib/services/on-boarding/on-boarding'
import { ColumnDef } from '@tanstack/react-table'
import ConfirmSelectHospitalDialog from './confirm-select-hospital-dialog'

export const selectHosColumns: ColumnDef<SelectHosDataTable>[] = [
  {
    accessorKey: 'name',
    header: '병원명',
  },

  {
    accessorKey: 'district',
    header: '시·군·구',
  },
  {
    id: 'action',
    header: '선택',
    cell: ({ row }) => {
      const hosId = row.original.hos_id
      const name = row.original.name

      return <ConfirmSelectHospitalDialog hosId={hosId} name={name} />
    },
  },
]
