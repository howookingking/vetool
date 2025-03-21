'use client'

import { Button } from '@/components/ui/button'
import { type HosDrug } from '@/types'
import { type ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown } from 'lucide-react'
import CautionColumn from './caution-column'
import { DeleteHosDrugColumn } from './delete-hos-drug-column'
import HosDrugNameColumn from './hos-drug-name-column'
import MlPerKgColumn from './ml-per-kg-column'
import RouteColumn from './route-column'
import UnitColumn from './unit-column'
import UnitPerKgColumn from './unit-per-kg-column'

export const hosDurgColumns: ColumnDef<HosDrug>[] = [
  {
    accessorKey: 'hos_drug_name',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          약물명
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const hosDrugName = row.original.hos_drug_name
      const hosDrugId = row.original.hos_drug_id
      return (
        <HosDrugNameColumn hosDrugName={hosDrugName} hosDrugId={hosDrugId} />
      )
    },
  },
  {
    accessorKey: 'unit',
    header: () => <span>단위</span>,
    cell: ({ row }) => {
      const unit = row.original.unit
      const hosDrugId = row.original.hos_drug_id

      return (
        <div className="flex justify-center">
          <UnitColumn unit={unit} hosDrugId={hosDrugId} />
        </div>
      )
    },
  },
  {
    accessorKey: 'unit_per_kg',
    header: () => <span>기본용량 (단위/kg)</span>,
    cell: ({ row }) => {
      const unitPerKg = row.original.unit_per_kg
      const hosDrugId = row.original.hos_drug_id
      const unit = row.original.unit

      return (
        <div className="flex justify-center">
          <UnitPerKgColumn
            unit={unit}
            hosDrugId={hosDrugId}
            unitPerKg={unitPerKg.toString()}
          />
        </div>
      )
    },
  },
  {
    accessorKey: 'ml_per_kg',
    header: () => <span>체중당 투여량 (ml/kg)</span>,
    cell: ({ row }) => {
      const mlPerKg = row.original.ml_per_kg
      const hosDrugId = row.original.hos_drug_id

      return (
        <div className="flex justify-center">
          <MlPerKgColumn hosDrugId={hosDrugId} mlPerKg={mlPerKg.toString()} />
        </div>
      )
    },
  },
  {
    accessorKey: 'route',
    header: () => <span>투여경로</span>,
    cell: ({ row }) => {
      const route = row.original.hos_drug_route
      const hosDrugId = row.original.hos_drug_id

      return (
        <div className="flex justify-center">
          <RouteColumn route={route} hosDrugId={hosDrugId} />
        </div>
      )
    },
  },
  {
    accessorKey: 'caution',
    header: () => <span>주사시 특이사항</span>,
    cell: ({ row }) => {
      const caution = row.original.caution
      const hosDrugId = row.original.hos_drug_id

      return (
        <div className="flex justify-center">
          <CautionColumn hosDrugId={hosDrugId} caution={caution} />
        </div>
      )
    },
  },
  {
    accessorKey: 'delete_hos_drug',
    header: () => <span>삭제</span>,
    cell: ({ row }) => {
      const hosDrugId = row.original.hos_drug_id
      const hosDrugName = row.original.hos_drug_name

      return (
        <div className="flex justify-center">
          <DeleteHosDrugColumn
            hosDrugId={hosDrugId}
            hosDrugName={hosDrugName}
          />
        </div>
      )
    },
  },
]
