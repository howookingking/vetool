import UpgragePlanPromptModal from '@/components/hospital/common/upgrade-plan-prompt-modal'
import { hasPermissions } from '@/constants/plans'
import { getPlan } from '@/lib/services/auth/plan'

export default async function CheckupPage(props: {
  params: Promise<{ hos_id: string }>
}) {
  const params = await props.params
  const plan = await getPlan(params.hos_id)

  const isCheckupEnabled = hasPermissions(plan, 'CHECKUP')

  if (!isCheckupEnabled) {
    return <UpgragePlanPromptModal />
  }

  return <div>건강검진차트</div>
}
