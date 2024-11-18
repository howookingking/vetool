'use client'

import NoResult from '@/components/common/no-result'
import SingleNotice from '@/components/hospital/home/notice/single-notice'
import { reorderNotices } from '@/lib/services/hospital-home/notice'
import type { NoticeWithUser } from '@/types/hospital/notice'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { ReactSortable, Sortable } from 'react-sortablejs'

export default function DragAndDropNoticeList({
  noticesData,
  hosId,
}: {
  noticesData: NoticeWithUser[]
  hosId: string
}) {
  const [sortableNotice, setSortableNotice] = useState(noticesData)
  const { refresh } = useRouter()

  useEffect(() => {
    setSortableNotice(noticesData)
  }, [noticesData])

  const handleReorder = (event: Sortable.SortableEvent) => {
    const noticeIds = noticesData.map((notice) => notice.id)
    const item = noticeIds.splice(event.oldIndex as number, 1)[0]
    noticeIds.splice(event.newIndex as number, 0, item)
    reorderNotices(noticeIds)
    refresh()
  }

  return (
    <div className="relative">
      {noticesData.length === 0 ? (
        <NoResult title="공지사항이 없습니다" className="h-[calc(35vh)]" />
      ) : (
        <ReactSortable
          list={sortableNotice}
          setList={setSortableNotice}
          className="flex flex-col gap-2"
          animation={250}
          handle=".handle"
          onEnd={handleReorder}
        >
          {sortableNotice.map((notice) => (
            <SingleNotice hosId={hosId} notice={notice} key={notice.id} />
          ))}
        </ReactSortable>
      )}
    </div>
  )
}
