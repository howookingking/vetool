import ChecklistTemplateEntry from '@/components/hospital/checklist/template/checklist-template-entry'
import { getChecklistTemplateCharts } from '@/lib/services/checklist/checklist-template'
import { TemplateChecklist } from '@/types/checklist/checklist-type'

type TemplatePageProps = {
  params: Promise<{
    hos_id: string
    target_date: string
  }>
}
export default async function ChecklistTemplatePage(props: TemplatePageProps) {
  const params = await props.params
  const _checklistTemplateCharts = await getChecklistTemplateCharts(
    params.hos_id as string,
  )
  let checklistTemplateCharts: TemplateChecklist[] | null = null
  if (_checklistTemplateCharts) {
    checklistTemplateCharts = _checklistTemplateCharts as TemplateChecklist[]
    console.log(checklistTemplateCharts)
  }

  return (
    <div className="mt-12 flex h-mobile flex-col border-t p-2 2xl:mt-0 2xl:h-desktop 2xl:border-0">
      <ChecklistTemplateEntry
        checklistTemplateCharts={checklistTemplateCharts}
      />
    </div>
  )
}
