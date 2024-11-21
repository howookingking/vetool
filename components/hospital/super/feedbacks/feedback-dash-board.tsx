'use client'

import FeedbackCard from '@/components/hospital/super/feedbacks/feedback-card'
import FeedbackFilter from '@/components/hospital/super/feedbacks/feedback-filter'
import { Card, CardContent } from '@/components/ui/card'
import { UserFeedbackType } from '@/types/vetool'
import { useMemo, useState } from 'react'

export default function FeedBackDashBoard({
  userFeedBackData,
}: {
  userFeedBackData: UserFeedbackType[]
}) {
  const [filter, setFilter] = useState('all')

  const filteredAndSortedLogs = useMemo(() => {
    let filtered = [...userFeedBackData]

    if (filter !== 'all') {
      filtered = filtered.filter((log) => log.feedback_category === filter)
    }

    return filtered
  }, [userFeedBackData, filter])

  return (
    <div className="flex flex-col gap-4">
      <FeedbackFilter value={filter} onChange={setFilter} />

      <div>
        {filteredAndSortedLogs.length === 0 ? (
          <Card>
            <CardContent className="flex h-32 items-center justify-center">
              <span className="text-muted-foreground">
                유저 피드백이 존재하지 않습니다!
              </span>
            </CardContent>
          </Card>
        ) : (
          filteredAndSortedLogs.map((log) => (
            <FeedbackCard key={log.feedback_id} feedbackData={log} />
          ))
        )}
      </div>
    </div>
  )
}
