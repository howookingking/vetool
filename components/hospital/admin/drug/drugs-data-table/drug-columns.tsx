'use client'

import HelperTooltip from '@/components/common/helper-tooltip'
import { Button } from '@/components/ui/button'
import type { HosDrugWithRawDrug } from '@/types/icu/drugs'
import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown } from 'lucide-react'
import DrugSpecificColumn from './drug-specific-column/drug-specific-column'
import DrugTagsColumn from './drug-tags-column/drug-tags-column'

export const drugColumns: ColumnDef<HosDrugWithRawDrug>[] = [
  {
    accessorKey: 'raw_drug_name',
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
  },

  {
    accessorKey: 'hos_drug_tag',
    header: () => {
      return (
        <div className="flex items-center justify-center gap-2">
          <span>약물 태그</span>
          <HelperTooltip>약물 검색시 사용됩니다 </HelperTooltip>
        </div>
      )
    },
    cell: ({ row }) => {
      const drugTags = row.original.hos_drug_tag
      return <DrugTagsColumn drugTags={drugTags} />
    },
  },
  {
    accessorKey: 'specific',
    header: () => {
      return <span>더보기</span>
    },
    cell: ({ row }) => {
      const drugIndication = row.original.hos_drug_indication
      const drugSideEffect = row.original.hos_drug_side_effect
      const drugDescription = row.original.hos_drug_description
      const drugDoses = row.original.hos_drug_dosages
      const rawDrugName = row.original.raw_drug_id.raw_drug_name
      const drugTags = row.original.hos_drug_tag
      return (
        <DrugSpecificColumn
          rawDrugName={rawDrugName}
          drugIndication={drugIndication}
          drugSideEffect={drugSideEffect}
          drugDescription={drugDescription}
          drugDoses={drugDoses}
          drugTags={drugTags}
        />
      )
    },
  },
]
