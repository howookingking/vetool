import UpgragePlanPromptModal from '@/components/hospital/common/upgrade-plan-prompt-modal'
import { hasPermissions } from '@/constants/company/plans'
import { getPlan } from '@/lib/services/auth/plan'

export default async function EchocardioPage(props: {
  params: Promise<{ hos_id: string }>
}) {
  const params = await props.params
  const plan = await getPlan(params.hos_id)

  const isEchocardioEnabled = hasPermissions(plan, 'ECHOCARDIO')

  if (!isEchocardioEnabled) {
    return <UpgragePlanPromptModal />
  }

  return <div>심장초음파차트</div>
}
