import UserAvatar from '@/components/hospital/common/user-avatar'
import { parseTextWithUrls } from '@/lib/utils/utils'
import type { NoticeWithUser } from '@/types/hospital/notice'
import { GripVertical } from 'lucide-react'
import { NoticeColorType } from './notice-schema'
import UpsertNoticeDialog from './upsert-notice-dialog'

export default function SingleNotice({
  hosId,
  notice,
}: {
  hosId: string
  notice: NoticeWithUser
}) {
  const textParts = parseTextWithUrls(notice.notice_text)

  return (
    <div
      className="relative flex items-center justify-between rounded-md border border-border px-2 py-2 md:px-1 md:py-1"
      style={{ backgroundColor: notice.notice_color ?? '#fff' }}
    >
      <div className="mx-2 flex w-full flex-col items-start justify-between gap-1 md:flex-row md:items-center">
        <div className="flex items-center gap-2">
          <GripVertical
            className="handle z-20 hidden shrink-0 md:block"
            size={16}
            cursor="grab"
          />
          <span className="whitespace-break-spaces">
            {textParts.map((part, index) =>
              part.type === 'url' ? (
                <a
                  key={index}
                  href={part.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="break-all text-blue-600 hover:underline"
                >
                  {part.content}
                </a>
              ) : (
                <span key={index}>{part.content}</span>
              ),
            )}
          </span>
        </div>

        <div className="mr-auto flex shrink-0 items-center gap-1 text-muted-foreground md:ml-auto md:mr-0">
          <UserAvatar
            src={notice.user_id.avatar_url}
            alt={notice.user_id.name}
          />
          <span className="text-sm">{notice.user_id.name}</span>
          <span className="text-sm">{notice.created_at.slice(0, 10)}</span>
        </div>
      </div>

      <UpsertNoticeDialog
        hosId={hosId}
        isEdit
        oldNoticeId={notice.id}
        oldNoticeText={notice.notice_text}
        oldNoticeColor={notice.notice_color as NoticeColorType}
      />
    </div>
  )
}
