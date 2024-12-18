import { getHosTimeGuidelines } from '@/lib/services/admin/icu/time-guidelines'
import { TimeGuideLinSettings } from './time-guideline-settings'

export default async function TimeGuidelineTab({ hosId }: { hosId: string }) {
  const hosGuidelineData = await getHosTimeGuidelines(hosId)
  return (
    <TimeGuideLinSettings hosGuidelineData={hosGuidelineData} hosId={hosId} />
  )
}
