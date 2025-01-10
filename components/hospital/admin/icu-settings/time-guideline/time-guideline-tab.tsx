'use client'

import { useBasicHosDataContext } from '@/providers/basic-hos-data-context-provider'
import { TimeGuideLinSettings } from './time-guideline-settings'

export default function TimeGuidelineTab({ hosId }: { hosId: string }) {
  const {
    basicHosData: { timeGuidelineData },
  } = useBasicHosDataContext()

  return (
    <TimeGuideLinSettings hosId={hosId} hosGuidelineData={timeGuidelineData} />
  )
}
