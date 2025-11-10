import DotLottie from '@/components/common/dot-lottie'
import ApprovalWaitingContents from '@/components/on-boarding/approval-waiting-contents'
import { getUserApproval } from '@/lib/services/on-boarding/on-boarding'

export default async function ApprovalWaitingPage() {
  const userApprovalData = await getUserApproval()

  return (
    <>
      <ApprovalWaitingContents userApprovalData={userApprovalData} />

      <DotLottie className="mt-4 w-full" path="/dot-lottie/waiting.lottie" />
    </>
  )
}
