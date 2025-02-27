import UpgragePromptModal from '@/components/hospital/common/upgrade-prompt-modal'
import { hasPermissions } from '@/constants/plans'
import { getPlan } from '@/lib/services/auth/plan'

export default async function AnalyticsPage(props: {
  params: Promise<{ hos_id: string }>
}) {
  const params = await props.params
  const plan = await getPlan(params.hos_id)

  const isAnalyticsEnabled = hasPermissions(plan, 'ANALYTICS')

  if (!isAnalyticsEnabled) {
    return <UpgragePromptModal />
  }

  return <div>데이터분석</div>
}
