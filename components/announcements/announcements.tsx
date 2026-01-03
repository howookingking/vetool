'use client'

import { Input } from '@/components/ui/input'
import type { AnnouncementList } from '@/types/vetool'
import { MegaphoneIcon, PinIcon, SearchIcon } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useMemo, useState } from 'react'
import AnnouncementCard from './annoucement-card'

export default function Announcements({
  announcements,
}: {
  announcements: AnnouncementList[]
}) {
  const [searchQuery, setSearchQuery] = useState('')

  const filteredAnnouncements = useMemo(() => {
    return announcements.filter((a) =>
      a.announcement_title.toLowerCase().includes(searchQuery.toLowerCase()),
    )
  }, [announcements, searchQuery])

  const pinnedItems = useMemo(
    () => filteredAnnouncements.filter((a) => a.is_pinned),
    [filteredAnnouncements],
  )

  const regularItems = useMemo(
    () => filteredAnnouncements.filter((a) => !a.is_pinned),
    [filteredAnnouncements],
  )

  return (
    <div className="min-h-screen bg-slate-50/50">
      {/* Hero Header */}
      <div className="relative overflow-hidden border-b bg-white">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5" />
        <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />

        <div className="relative mx-auto max-w-5xl px-4 py-16 md:py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
              <MegaphoneIcon className="h-4 w-4" />
              <span>진행 상황 및 공지사항</span>
            </div>
            <h1 className="mb-6 text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
              벳툴 공지사항
            </h1>
            <p className="mx-auto mb-10 max-w-2xl text-lg text-slate-600">
              벳툴의 새로운 기능, 업데이트 소식 및 중요 공지사항을 확인하세요.
              <br />더 나은 서비스를 위해 항상 노력하고 있습니다.
            </p>

            <div className="relative mx-auto max-w-md">
              <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center">
                <SearchIcon className="h-5 w-5 text-slate-400" />
              </div>
              <Input
                type="text"
                placeholder="공지사항 제목으로 검색..."
                className="h-12 rounded-xl border-slate-200 bg-white/80 pl-10 shadow-sm backdrop-blur-sm transition-all focus:ring-primary/20"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-5xl px-4 py-12">
        <div className="space-y-12">
          {/* Pinned Announcements */}
          {pinnedItems.length > 0 && (
            <section>
              <div className="mb-6 flex items-center gap-2">
                <PinIcon className="h-4 w-4 fill-primary text-primary" />
                <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500">
                  중요 공지
                </h2>
              </div>
              <div className="grid gap-4">
                <AnimatePresence mode="popLayout">
                  {pinnedItems.map((announcement, index) => (
                    <AnnouncementCard
                      key={announcement.announcement_id}
                      announcement={announcement}
                      index={index}
                      priority
                    />
                  ))}
                </AnimatePresence>
              </div>
            </section>
          )}

          {/* Regular Announcements */}
          <section>
            <div className="mb-6 flex items-center gap-2 text-slate-500">
              <h2 className="text-sm font-bold uppercase tracking-wider">
                전체 소식
              </h2>
              <div className="h-px flex-1 bg-slate-200" />
            </div>

            {regularItems.length > 0 ? (
              <div className="grid gap-3">
                <AnimatePresence mode="popLayout">
                  {regularItems.map((announcement, index) => (
                    <AnnouncementCard
                      key={announcement.announcement_id}
                      announcement={announcement}
                      index={index}
                    />
                  ))}
                </AnimatePresence>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="rounded-2xl border-2 border-dashed border-slate-200 bg-white py-20 text-center"
              >
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-slate-100">
                  <SearchIcon className="h-6 w-6 text-slate-400" />
                </div>
                <h3 className="text-lg font-medium text-slate-900">
                  검색 결과가 없습니다
                </h3>
                <p className="mt-1 text-slate-500">
                  다른 검색어를 입력해 보세요.
                </p>
              </motion.div>
            )}
          </section>
        </div>
      </div>
    </div>
  )
}
