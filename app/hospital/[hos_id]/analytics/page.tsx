import UpgragePlanPromptModal from '@/components/hospital/common/upgrade-plan-prompt-modal'
import { hasPermissions } from '@/constants/company/plans'
import { getPlan } from '@/lib/services/auth/plan'

export default async function AnalyticsPage(props: {
  params: Promise<{ hos_id: string }>
}) {
  const params = await props.params
  const plan = await getPlan(params.hos_id)

  const isAnalyticsEnabled = hasPermissions(plan, 'ANALYTICS')

  if (!isAnalyticsEnabled) {
    return <UpgragePlanPromptModal />
  }

  return <div>데이터분석</div>
}
