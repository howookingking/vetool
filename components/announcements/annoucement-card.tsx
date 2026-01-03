import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils/utils'
import type { AnnouncementList } from '@/types/vetool'
import { format } from 'date-fns'
import {
  BarChart4Icon,
  ChevronRightIcon,
  HeartPulseIcon,
  HomeIcon,
  ListChecksIcon,
  PawPrintIcon,
  SliceIcon,
  SyringeIcon,
  TagIcon,
} from 'lucide-react'
import { motion } from 'motion/react'
import Link from 'next/link'
import { useMemo } from 'react'

export const CATEGORY_MAP = [
  {
    kor: '병원홈',
    eng: 'home',
    icon: HomeIcon,
  },
  {
    kor: '일반',
    eng: 'general',
    icon: TagIcon,
  },
  {
    kor: '환자목록',
    eng: 'patients',
    icon: PawPrintIcon,
  },
  {
    kor: '입원차트',
    eng: 'icu',
    icon: SyringeIcon,
  },
  {
    kor: '외과차트',
    eng: 'surgery',
    icon: SliceIcon,
  },
  {
    kor: '심초차트',
    eng: 'echocardio',
    icon: HeartPulseIcon,
  },
  {
    kor: '건강검진차트',
    eng: 'checkup',
    icon: ListChecksIcon,
  },
  {
    kor: '데이터분석',
    eng: 'analytics',
    icon: BarChart4Icon,
  },
] as const

type Props = {
  announcement: AnnouncementList
  index: number
  priority?: boolean
}

export default function AnnouncementCard({
  announcement,
  index,
  priority = false,
}: Props) {
  const isNew = useMemo(() => {
    const createdDate = new Date(announcement.created_at)
    const weekAgo = new Date()
    weekAgo.setDate(weekAgo.getDate() - 7)
    return createdDate > weekAgo
  }, [announcement.created_at])

  const category = useMemo(() => {
    return CATEGORY_MAP.find(
      (c) => c.eng === announcement.announcement_category,
    )
  }, [announcement.announcement_category])

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
    >
      <Link
        href={`/announcements/${announcement.announcement_id}`}
        className={cn(
          'group relative block rounded-2xl border bg-white p-5 transition-all duration-300',
          'hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5',
          priority ? 'border-primary/20 bg-primary/[0.02]' : 'border-slate-200',
        )}
      >
        <div className="flex flex-col gap-4 md:flex-row md:items-center">
          <div className="min-w-0 flex-1">
            <div className="mb-2 flex flex-wrap items-center gap-2">
              {announcement.announcement_category && (
                <Badge
                  variant="secondary"
                  className="rounded-md border-none bg-slate-100 px-2 font-medium text-slate-600 hover:bg-slate-100"
                >
                  {category ? (
                    <>
                      <category.icon className="mr-1 h-3 w-3" />
                      {category.kor}
                    </>
                  ) : (
                    <>
                      <TagIcon className="mr-1 h-3 w-3" />
                      {announcement.announcement_category}
                    </>
                  )}
                </Badge>
              )}
              {priority && (
                <Badge
                  variant="default"
                  className="rounded-md bg-primary px-2 font-bold hover:bg-primary"
                >
                  중요
                </Badge>
              )}
              {isNew && !priority && (
                <Badge
                  variant="outline"
                  className="animate-pulse rounded-md border-emerald-200 bg-emerald-50 px-2 font-bold text-emerald-700"
                >
                  NEW
                </Badge>
              )}
            </div>

            <h3
              className={cn(
                'text-lg font-semibold leading-snug tracking-tight transition-colors group-hover:text-primary',
                priority ? 'text-slate-900' : 'text-slate-800',
              )}
            >
              {announcement.announcement_title}
            </h3>
          </div>

          <div className="flex shrink-0 items-center justify-between gap-6 md:justify-end">
            <div className="flex flex-col items-end gap-1">
              <div className="flex items-center gap-1.5 text-sm text-slate-500">
                <time dateTime={announcement.created_at} className="font-mono">
                  {format(new Date(announcement.created_at), 'yy.MM.dd')}
                </time>
              </div>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-50 text-slate-400 transition-colors group-hover:bg-primary/10 group-hover:text-primary">
              <ChevronRightIcon className="h-5 w-5 transition-transform group-hover:translate-x-0.5" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
