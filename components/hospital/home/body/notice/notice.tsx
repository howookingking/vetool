import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Suspense } from 'react'
import NoticeTodoRefreshButton from '../notice-todo-refresh-button'
import NoticeDataFetchingLayer from './notice-data-fetching-layer'
import NoticeSkeleton from './notice-skeleton'
import UpsertNoticeDialog from './upsert-notice-dialog'

export default function Notice({ hosId }: { hosId: string }) {
  return (
    <Card className="w-full rounded-sm xl:w-3/4">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <h4>공지사항</h4>
            <NoticeTodoRefreshButton />
          </div>

          <UpsertNoticeDialog hosId={hosId} />
        </CardTitle>
      </CardHeader>

      <CardContent>
        <Suspense fallback={<NoticeSkeleton />}>
          <NoticeDataFetchingLayer hosId={hosId} />
        </Suspense>
      </CardContent>
    </Card>
  )
}
