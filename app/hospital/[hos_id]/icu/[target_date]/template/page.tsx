import IcuTemplateEntry from '@/components/hospital/icu/main/template/icu-template-entry'
import { fetchIcuTemplates } from '@/lib/services/icu/template/template'

type TemplatePageProps = {
  params: Promise<{
    hos_id: string
    target_date: string
  }>
}
export default async function TemplatePage(props: TemplatePageProps) {
  const params = await props.params
  const icuTemplates = await fetchIcuTemplates(params.hos_id as string)

  return (
    <div className="mt-12 flex h-mobile flex-col border-t p-2 2xl:mt-0 2xl:h-desktop 2xl:border-0">
      <IcuTemplateEntry icuTemplates={icuTemplates} />
    </div>
  )
}
