'use client'

import { templateColumns } from '@/components/hospital/icu/main/template/template-columns'
import DataTable from '@/components/ui/data-table'
import type { IcuTemplate } from '@/types'
import UpsertTemplateDialog from './upsert-template-dialog'

type Props = {
  icuTemplates: IcuTemplate[]
  hosId: string
}

export default function IcuTemplateEntry({ icuTemplates, hosId }: Props) {
  return (
    <div className="p-2">
      <DataTable
        columns={templateColumns(hosId)}
        data={icuTemplates}
        searchPlaceHolder="템플릿 이름, 설명으로 검색"
      />

      {/* 새로운 템플릿 추가 */}
      <UpsertTemplateDialog hosId={hosId} isEdit={false} template={null} />
    </div>
  )
}
