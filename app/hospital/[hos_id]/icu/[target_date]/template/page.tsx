import MobileTitle from '@/components/common/mobile-title'
import IcuTemplateEntry from '@/components/hospital/icu/main/template/icu-template-entry'
import { fetchIcuTemplates } from '@/lib/services/icu/template/template'
import { BookmarkIcon } from 'lucide-react'

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
    <>
      <MobileTitle icon={BookmarkIcon} title="템플릿" />

      <IcuTemplateEntry icuTemplates={icuTemplates} />
    </>
  )
}
