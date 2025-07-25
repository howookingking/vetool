import ChecklistTemplateEntry from '@/components/hospital/checklist/template/checklist-template-entry'

type TemplatePageProps = {
  params: Promise<{
    hos_id: string
    target_date: string
  }>
}
export default async function ChecklistTemplatePage(props: TemplatePageProps) {
  const params = await props.params
  //   const templateCharts = await getTemplateCharts(params.hos_id as string)

  return (
    <div className="mt-12 flex h-mobile flex-col border-t p-2 2xl:mt-0 2xl:h-desktop 2xl:border-0">
      <ChecklistTemplateEntry templateChecklists={[]} />
    </div>
  )
}
