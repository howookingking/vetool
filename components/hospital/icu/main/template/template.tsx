'use client'

import PreviewDialog from '@/components/hospital/icu/common-dialogs/preview/preview-dialog'
import AddTemplateOrders from '@/components/hospital/icu/main/template/add/add-template-orders'
import EditTemplateDialogs from '@/components/hospital/icu/main/template/edit/edit-template-dialogs'
import { templateColumns } from '@/components/hospital/icu/main/template/table/template-columns'
import DataTable from '@/components/ui/data-table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { usePreviewDialogStore } from '@/lib/store/icu/preview-dialog'
import { useTemplateStore } from '@/lib/store/icu/template'
import type { TemplateChart } from '@/types/icu/template'

export default function Template({
  templateCharts,
}: {
  templateCharts: TemplateChart[]
}) {
  const { isPreviewDialogOpen } = usePreviewDialogStore()
  const { isTemplateDialogOpen } = useTemplateStore()

  return (
    <Tabs defaultValue="search" className="p-2">
      <TabsList className="grid grid-cols-2">
        <TabsTrigger value="search">템플릿 검색</TabsTrigger>
        <TabsTrigger value="add">템플릿 추가</TabsTrigger>
      </TabsList>

      {/* 템플릿 검색 */}
      <TabsContent value="search">
        <DataTable
          columns={templateColumns}
          data={templateCharts || []}
          searchPlaceHolder="템플릿 이름, 설명, 환자명으로 검색"
        />
      </TabsContent>

      {/* 템플릿 추가 */}
      <TabsContent value="add">
        <AddTemplateOrders />
      </TabsContent>

      <div className="p-2">{isPreviewDialogOpen && <PreviewDialog />}</div>
      <div className="p-2">
        {isTemplateDialogOpen && <EditTemplateDialogs />}
      </div>
    </Tabs>
  )
}
