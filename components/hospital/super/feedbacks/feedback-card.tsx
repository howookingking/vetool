import { Badge } from '@/components/ui/badge'
import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { updateReadFeedback } from '@/lib/services/super/feedback/feedback'
import { cn, formatTimeDifference } from '@/lib/utils/utils'
import type { UserFeedbackType } from '@/types/vetool'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function FeedbackCard({
  feedbackData,
}: {
  feedbackData: UserFeedbackType
}) {
  const [isRead, setIsRead] = useState(feedbackData.is_read)
  const { refresh } = useRouter()

  const handleReadFeedbackChange = async (feedBackId: string) => {
    setIsRead((prev) => !prev)

    await updateReadFeedback(feedBackId)
    refresh()
  }

  return (
    <Card className="mb-4">
      <CardHeader className="cursor-pointer">
        <div className="flex items-center gap-2">
          <label
            htmlFor={feedbackData.feedback_id}
            className={cn(
              'flex cursor-pointer items-center gap-2 text-sm font-semibold',
              !isRead ? 'text-rose-500' : 'text-primary',
            )}
          >
            <Checkbox
              id={feedbackData.feedback_id}
              checked={isRead}
              onCheckedChange={() =>
                handleReadFeedbackChange(feedbackData.feedback_id)
              }
            />

            <span>{isRead ? '피드백 완료' : '미확인'}</span>
          </label>
        </div>
        <div className="flex items-center justify-between gap-10">
          <div className="flex items-center space-x-3">
            <div className="shrink-0">
              <Badge>{feedbackData.feedback_category.split('(')[0]}</Badge>
            </div>
            <CardTitle className={cn('px-4 text-lg', isRead && 'line-through')}>
              {feedbackData.feedback_description}
            </CardTitle>
          </div>

          {feedbackData.user_id ? (
            <div className="flex shrink-0 flex-col items-end space-x-4 text-sm">
              <span>{feedbackData.user_id.hos_id.city}</span>
              <span>{feedbackData.user_id.hos_id.name}</span>
              <span className="text-gray-500">
                {formatTimeDifference(feedbackData.created_at)}
              </span>
            </div>
          ) : (
            <div className="flex shrink-0 flex-col items-end space-x-4 text-sm">
              <span>{feedbackData.feedback_description.split(' ')[0]}</span>
              <span>
                {feedbackData.feedback_description.split(' ')[1]} (병원명 혹은
                이름)
              </span>
              <span className="text-gray-500">
                {formatTimeDifference(feedbackData.created_at)}
              </span>
            </div>
          )}
        </div>
      </CardHeader>
    </Card>
  )
}
