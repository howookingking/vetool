import MobileTitle from '@/components/common/mobile-title'
import IcuTemplateEntry from '@/components/hospital/icu/main/template/icu-template-entry'
import { getIcuTemplates } from '@/lib/services/icu/template/template'
import { BookmarkIcon } from 'lucide-react'

export default async function TemplatePage(
  props: PageProps<'/hospital/[hos_id]/icu/[target_date]/template'>,
) {
  const { hos_id } = await props.params
  const icuTemplates = await getIcuTemplates(hos_id)

  return (
    <>
      <MobileTitle icon={BookmarkIcon} title="템플릿" />

      <IcuTemplateEntry icuTemplates={icuTemplates} hosId={hos_id} />
    </>
  )
}
