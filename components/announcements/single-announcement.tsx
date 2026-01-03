'use client'

import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import type { AnnouncementDetailData } from '@/types/vetool'
import { format } from 'date-fns'
import { ko } from 'date-fns/locale'
import {
  CalendarIcon,
  ChevronLeftIcon,
  MessageCircleIcon,
  TagIcon,
} from 'lucide-react'
import { motion } from 'motion/react'
import Link from 'next/link'
import { useMemo } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { CATEGORY_MAP } from './annoucement-card'

export default function SingleAnnouncement({
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

  const category = useMemo(() => {
    return CATEGORY_MAP.find((c) => c.eng === announcement_category)
  }, [announcement_category])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mx-auto max-w-4xl px-4 py-8 md:py-16"
    >
      <div className="mb-8">
        <Link
          href="/announcements"
          className="group mb-6 inline-flex items-center text-sm font-medium text-slate-500 transition-colors hover:text-primary"
        >
          <ChevronLeftIcon className="mr-1 h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
          목록으로 돌아가기
        </Link>

        <div className="mb-4 flex flex-wrap items-center gap-3">
          {announcement_category && (
            <Badge
              variant="secondary"
              className="border-transparent bg-primary/10 px-3 py-1 text-primary hover:bg-primary/10"
            >
              {category ? (
                <>
                  <category.icon className="mr-1.5 h-3 w-3" />
                  {category.kor}
                </>
              ) : (
                <>
                  <TagIcon className="mr-1.5 h-3 w-3" />
                  {announcement_category}
                </>
              )}
            </Badge>
          )}
          <div className="flex items-center gap-1.5 text-sm text-slate-500">
            <CalendarIcon className="h-4 w-4" />
            <time dateTime={created_at}>
              {format(new Date(created_at), 'yyyy년 MM월 dd일', { locale: ko })}
            </time>
          </div>
        </div>

        <h1 className="text-3xl font-bold leading-tight tracking-tight text-slate-900 md:text-4xl">
          {announcement_title}
        </h1>
      </div>

      <Card className="overflow-hidden rounded-2xl border-slate-200 shadow-sm">
        {/* 본문 섹션 */}
        <div className="p-6 md:p-10">
          <div className="prose prose-slate max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-img:rounded-2xl prose-img:shadow-md">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {announcement_content}
            </ReactMarkdown>
          </div>
        </div>

        {/* 피드백 섹션 */}
        {feedback_id?.feedback_description && (
          <div className="border-t border-slate-100 bg-slate-50 p-6 md:p-10">
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-primary shadow-sm">
                <MessageCircleIcon className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <h3 className="mb-2 text-sm font-bold uppercase tracking-wider text-slate-500">
                  반영된 피드백
                </h3>
                <p className="italic leading-relaxed text-slate-700">
                  &quot;{feedback_id.feedback_description}&quot;
                </p>
                <p className="mt-3 text-sm text-slate-500">
                  위 피드백을 바탕으로 본 공지사항의 기능이 구현/수정되었습니다.
                </p>
              </div>
            </div>
          </div>
        )}
      </Card>

      <div className="mt-12 text-center">
        <p className="text-sm text-slate-400">
          벳툴은 사용자의 소중한 의견을 항상 귀담아 듣고 있습니다.
        </p>
      </div>
    </motion.div>
  )
}
