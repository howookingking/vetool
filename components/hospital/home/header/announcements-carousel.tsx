'use client'

import { type AnnouncementTitles } from '@/types/vetool'
import { ChevronRight, Megaphone } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function AnnouncementsCarousel({
  announcementTitlesData,
}: {
  announcementTitlesData: AnnouncementTitles[]
}) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    if (announcementTitlesData.length <= 1) return
    if (isPaused) return

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex >= announcementTitlesData.length - 1 ? 0 : prevIndex + 1,
      )
    }, 3000)
    return () => clearInterval(interval)
  }, [announcementTitlesData.length, isPaused])

  if (announcementTitlesData.length === 0) {
    return null
  }

  return (
    <div className="h-10 min-w-[360px]">
      <Link
        href={`/announcements/${announcementTitlesData[currentIndex].announcement_id}`}
        target="_blank"
        className="group relative flex h-full items-center overflow-hidden bg-background px-3 transition-all duration-300 hover:bg-accent"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <Megaphone size="18" className="mr-2 shrink-0 text-primary" />

        <div className="relative flex h-full flex-1 items-center">
          {announcementTitlesData.map((announcement, index) => {
            const isCurrent = index === currentIndex
            const isPrev =
              index ===
              (currentIndex - 1 + announcementTitlesData.length) %
                announcementTitlesData.length

            return (
              <div
                key={announcement.announcement_id}
                className={`absolute w-full ${
                  isCurrent
                    ? 'z-10 animate-slideDown'
                    : isPrev
                      ? 'pointer-events-none animate-slideUp'
                      : 'pointer-events-none translate-y-full opacity-0'
                }`}
              >
                <div className="flex items-center justify-between px-2">
                  <p className="w-full truncate text-center text-sm font-medium">
                    {announcement.announcement_title}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

        <ChevronRight
          size="16"
          className="ml-2 transform opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100"
        />
      </Link>
    </div>
  )
}
