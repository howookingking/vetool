'use client'

import CompanyColumn from '@/components/hospital/admin/drug/company-column'
import DeleteDrugDialog from '@/components/hospital/admin/drug/delete-drug-dialog'
import DescriptionColumn from '@/components/hospital/admin/drug/description-column'
import IndicationColumn from '@/components/hospital/admin/drug/indication-column'
import MassVolumeColumn from '@/components/hospital/admin/drug/mass-volume-column'
import ProductNameColumn from '@/components/hospital/admin/drug/product-name-column'
import SideEffectColumn from '@/components/hospital/admin/drug/side-effect-column'
import TypeColumn from '@/components/hospital/admin/drug/type-column'
import UnitColumn from '@/components/hospital/admin/drug/unit-column'
import { Button } from '@/components/ui/button'
import { DrugProductDetail } from '@/types/adimin'
import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown } from 'lucide-react'

export const drugColumns: ColumnDef<DrugProductDetail>[] = [
  {
    accessorKey: 'drugName',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          원료명
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const drugName = row.original.name
      return <span>{drugName}</span>
    },
  },
  {
    accessorKey: 'productName',
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
      const drugName = row.original.name
      return (
        <ProductNameColumn
          hosId={row.original.hos_id as string}
          id={row.original.drug_products_id}
          productName={drugName}
        />
      )
    },
  },
  {
    accessorKey: 'description',
    header: () => {
      return <span>설명</span>
    },
    cell: ({ row }) => {
      return (
        <DescriptionColumn
          hosId={row.original.hos_id as string}
          drugProductId={row.original.drug_products_id}
          description={row.original.description ?? ''}
        />
      )
    },
  },
  {
    accessorKey: 'indication',
    header: () => {
      return <span>적응증</span>
    },
    cell: ({ row }) => {
      return (
        <IndicationColumn
          hosId={row.original.hos_id as string}
          drugDescriptionId={row.original.drug_products_id}
          indication={''}
        />
      )
    },
  },
  {
    accessorKey: 'massVol',
    header: ({ column }) => {
      return <span>총량</span>
    },
    cell: ({ row }) => {
      return (
        <MassVolumeColumn
          drugProductId={row.original.drug_products_id}
          hosId={row.original.hos_id as string}
          massVol={row.original.mass_vol ?? 0}
        />
      )
    },
  },
  {
    accessorKey: 'type',
    header: ({ column }) => {
      return <span>유형</span>
    },
    cell: ({ row }) => {
      return (
        <TypeColumn
          drugProductId={row.original.drug_products_id}
          hosId={row.original.hos_id as string}
          type={row.original.type ?? ''}
        />
      )
    },
  },
  {
    accessorKey: 'unit',
    header: ({ column }) => {
      return <span>단위</span>
    },
    cell: ({ row }) => {
      return (
        <UnitColumn
          productId={row.original.drug_products_id}
          unit={row.original.unit ?? ''}
        />
      )
    },
  },

  {
    accessorKey: 'sideEffect',
    header: ({ column }) => {
      return <span>부작용</span>
    },
    cell: ({ row }) => {
      return (
        <SideEffectColumn id={row.original.drug_products_id} sideEffect={'-'} />
      )
    },
  },

  {
    accessorKey: 'company',
    header: ({ column }) => {
      return <span>제약사</span>
    },
    cell: ({ row }) => {
      return (
        <CompanyColumn
          id={row.original.drug_products_id}
          company={row.original.company ?? '-'}
        />
      )
    },
  },

  {
    accessorKey: 'delete',
    header: () => {
      return <span>삭제</span>
    },
    cell: ({ row }) => {
      return (
        <DeleteDrugDialog
          id={row.original.drug_products_id}
          drugName={row.original.name}
        />
      )
    },
  },
]
