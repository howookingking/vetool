import UpgragePlanPromptModal from '@/components/hospital/common/upgrade-plan-prompt-modal'
import { hasPermissions } from '@/constants/plans'
import { getPlan } from '@/lib/services/auth/plan'

export default async function SurgeryPage(props: {
  params: Promise<{ hos_id: string }>
}) {
  const params = await props.params
  const plan = await getPlan(params.hos_id)

  const isSurgeryEnabled = hasPermissions(plan, 'SURGERY')

  if (!isSurgeryEnabled) {
    return <UpgragePlanPromptModal />
  }

  return <div>외과차트</div>
}
