import type { NoticeWithUser } from '@/types/hospital/notice'
import { GripVertical } from 'lucide-react'
import Image from 'next/image'
import CreateOrUpdateNoticeDialog from './create-or-update-notice-dialog'
import { NoticeColorType } from './notice-schema'

export default function SingleNotice({
  hosId,
  notice,
}: {
  hosId: string
  notice: NoticeWithUser
}) {
  return (
    <div
      className="relative flex items-center justify-between rounded-md border border-border px-1 py-1"
      style={{ backgroundColor: notice.notice_color ?? '#fff' }}
    >
      <div className="mx-2 flex w-full flex-col items-start justify-between gap-2 md:flex-row md:items-center">
        <div className="flex items-center gap-2">
          <GripVertical
            className="handle z-20 hidden shrink-0 md:block"
            size={16}
            cursor="grab"
          />
          <span className="whitespace-break-spaces">{notice.notice_text}</span>
        </div>

        <div className="ml-auto flex shrink-0 items-center gap-1">
          <Image
            unoptimized
            src={notice.user_id.avatar_url ?? ''}
            alt={notice.user_id.name}
            width={20}
            height={20}
            className="rounded-full"
            priority
          />
          <span className="text-sm">{notice.user_id.name}</span>
          <span className="ml-2 text-sm">{notice.created_at.slice(0, 10)}</span>
        </div>
      </div>

      <CreateOrUpdateNoticeDialog
        hosId={hosId}
        isEdit
        oldNoticeId={notice.id}
        oldNoticeText={notice.notice_text}
        oldNoticeColor={notice.notice_color as NoticeColorType}
      />
    </div>
  )
}
