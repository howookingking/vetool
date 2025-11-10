'use client'

import { Button } from '@/components/ui/button'
import { logout } from '@/lib/services/auth/authentication'
import {
  cancelApproval,
  type UserApprovalData,
} from '@/lib/services/on-boarding/on-boarding'
import { useState } from 'react'
import { Spinner } from '../ui/spinner'

export default function ApprovalWaitingContents({
  userApprovalData,
}: {
  userApprovalData: UserApprovalData
}) {
  const [isCanceling, setIsCanceling] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleCancelApproval = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsCanceling(true)
    await cancelApproval(userApprovalData.user_approval_id)
    await logout()
  }

  const handleLogout = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    await logout()
  }

  return (
    <div className="flex flex-col items-center gap-3">
      <div>
        <span className="pr-1 text-xl font-bold">
          {userApprovalData.hos_id.name}
        </span>
        에서 승인 대기중입니다
      </div>
      <div className="flex gap-2">
        <form onSubmit={handleCancelApproval}>
          <input
            type="text"
            defaultValue={userApprovalData.user_approval_id}
            className="hidden"
            name="user_approval_id"
          />
          <Button
            className="w-full"
            disabled={isCanceling || isSubmitting}
            variant="outline"
          >
            승인요청 취소
            {isCanceling && <Spinner className="animate-spin" />}
          </Button>
        </form>

        <form onSubmit={handleLogout} className="w-full">
          <Button
            type="submit"
            disabled={isCanceling || isSubmitting}
            className="w-full"
          >
            홈으로 이동
            {isSubmitting && <Spinner className="animate-spin" />}
          </Button>
        </form>
      </div>
    </div>
  )
}
