import { Badge } from '@/components/ui/badge'
import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import { formatTimeDifference } from '@/lib/utils/utils'
import type { UserFeedbackType } from '@/types/vetool'
import { useState } from 'react'

export default function FeedbackCard({
  feedbackData,
}: {
  feedbackData: UserFeedbackType
}) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <Card className="mb-4">
      <CardHeader
        className="cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center justify-between gap-10">
          <div className="flex items-center space-x-3">
            <div className="shrink-0">
              <Badge>{feedbackData.feedback_category.split('(')[0]}</Badge>
            </div>
            <CardTitle className="px-4 text-lg">
              {feedbackData.feedback_description}
            </CardTitle>
          </div>

          <div className="flex shrink-0 flex-col items-end space-x-4 text-sm">
            <span>{feedbackData.user_id.hos_id.city}</span>
            <span>{feedbackData.user_id.hos_id.name}</span>
            <span className="text-gray-500">
              {formatTimeDifference(feedbackData.created_at)}
            </span>
          </div>
        </div>
      </CardHeader>
    </Card>
  )
}
