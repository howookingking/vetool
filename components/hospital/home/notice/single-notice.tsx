import type { NoticeWithUser } from '@/types/hospital/notice'
import { GripVertical } from 'lucide-react'
import Image from 'next/image'
import CreateOrUpdateNoticeDialog from './create-or-update-notice-dialog'
import { NoticeColorType } from './notice-schema'

// Function to detect URLs in text and split into parts
const parseTextWithUrls = (text: string) => {
  // Updated regex to catch URLs with or without protocol
  const urlRegex =
    /(https?:\/\/[^\s]+|www\.[^\s]+|\b[a-zA-Z0-9][a-zA-Z0-9-]+\.[a-zA-Z]{2,}\b)/g
  const parts = []
  let lastIndex = 0
  let match

  while ((match = urlRegex.exec(text)) !== null) {
    // Add text before URL
    if (match.index > lastIndex) {
      parts.push({
        type: 'text',
        content: text.slice(lastIndex, match.index),
      })
    }
    // Add URL with appropriate protocol
    const url = match[0]
    const urlWithProtocol = url.startsWith('http') ? url : `https://${url}`
    parts.push({
      type: 'url',
      content: url,
      href: urlWithProtocol,
    })
    lastIndex = match.index + match[0].length
  }

  // Add remaining text
  if (lastIndex < text.length) {
    parts.push({
      type: 'text',
      content: text.slice(lastIndex),
    })
  }

  return parts
}

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
          <span className="whitespace-break-spaces">
            {textParts.map((part, index) =>
              part.type === 'url' ? (
                <a
                  key={index}
                  href={part.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  {part.content}
                </a>
              ) : (
                <span key={index}>{part.content}</span>
              ),
            )}
          </span>
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
