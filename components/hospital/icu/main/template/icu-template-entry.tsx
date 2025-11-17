'use client'

import { templateColumns } from '@/components/hospital/icu/main/template/template-columns'
import DataTable from '@/components/ui/data-table'
import type { IcuTemplate } from '@/types'
import type { SelectedIcuOrder } from '@/types/icu/chart'
import { useState } from 'react'
import UpsertTemplateDialog from './upsert-template-dialog'

export default function IcuTemplateEntry({
  icuTemplates,
}: {
  icuTemplates: IcuTemplate[]
}) {
  const [isUpsertTemplateDialogOpen, setIsUpsertTemplateDialogOpen] =
    useState(false)
  const [sortedOrders, setSortedOrders] = useState<SelectedIcuOrder[]>([])
  const [isEdit, setIsEdit] = useState(false)
  const [selectedTemplateChart, setSelectedTemplateChart] =
    useState<IcuTemplate | null>(null)

  return (
    <div className="relative p-2">
      <DataTable
        searchBarSpace
        columns={templateColumns(
          setIsUpsertTemplateDialogOpen,
          setSortedOrders,
          setIsEdit,
          setSelectedTemplateChart,
        )}
        data={icuTemplates ?? []}
        searchPlaceHolder="템플릿 이름, Tag로 검색"
      />

      <UpsertTemplateDialog
        isUpsertTemplateDialogOpen={isUpsertTemplateDialogOpen}
        setIsUpsertTemplateDialogOpen={setIsUpsertTemplateDialogOpen}
        sortedOrders={sortedOrders}
        setSortedOrders={setSortedOrders}
        isEdit={isEdit}
        setIsEdit={setIsEdit}
        selectedTemplateChart={selectedTemplateChart}
        setSelectedTemplateChart={setSelectedTemplateChart}
      />
    </div>
  )
}
