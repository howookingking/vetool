import { Card } from '@/components/ui/card'
import { SIDEBAR_ITEMS } from '@/constants/hospital/sidebar-items'
import { type AnnouncementDetailData } from '@/types/vetool'
import { MessageCircle } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export default function AnnouncementDetail({
  announcementDetailData,
}: {
  announcementDetailData: AnnouncementDetailData
}) {
  const {
    announcement_title,
    announcement_content,
    created_at,
    feedback_id,
    announcement_category,
  } = announcementDetailData

  return (
    <Card className="divide-y rounded-lg" style={{ margin: 0 }}>
      {/* 헤더 섹션 */}
      <div className="p-6">
        <div className="flex items-center justify-center">
          <div className="flex flex-col gap-2 text-center">
            <span className="text-xl font-bold">{announcement_title}</span>
            <span className="text-xs leading-6 text-muted-foreground">
              {`${SIDEBAR_ITEMS.find((item) => item.path === announcement_category)?.name ?? '전체'} | 
              ${created_at.slice(0, 10)}`}
            </span>
          </div>
        </div>
      </div>

      {/* 본문 섹션 */}
      <div className="min-h-[400px] p-6">
        <div className="prose max-w-none">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {announcement_content}
          </ReactMarkdown>
        </div>
      </div>

      {/* 피드백 섹션 */}
      {feedback_id?.feedback_description && (
        <div className="bg-muted/50 p-6">
          <div className="mb-4 flex items-center gap-2 text-muted-foreground">
            <MessageCircle size={20} />
            <span className="text-lg font-semibold">반영된 피드백</span>
          </div>

          <div className="rounded-lg bg-card p-4">
            <div className="text-sm">
              <span>{feedback_id.feedback_description}</span>
            </div>
          </div>
        </div>
      )}
    </Card>
  )
}
