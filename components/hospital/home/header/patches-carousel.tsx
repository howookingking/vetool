'use client'

import { ChevronRight, Megaphone } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export type PatchTitles = {
  patch_id: string
  patch_title: string
}

type PatchesCarouselProps = {
  hosId: string
  patchTitlesData: PatchTitles[]
}

export default function PatchesCarousel({
  hosId,
  patchTitlesData,
}: PatchesCarouselProps) {
  const { push } = useRouter()

  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    if (patchTitlesData.length <= 1) return
    if (isPaused) return

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex >= patchTitlesData.length - 1 ? 0 : prevIndex + 1,
      )
    }, 5000)
    return () => clearInterval(interval)
  }, [patchTitlesData.length, isPaused])

  if (patchTitlesData.length === 0) {
    return null
  }

  return (
    <div className="hidden h-10 w-[300px] sm:block">
      <div
        className="group relative flex h-full items-center overflow-hidden bg-background px-3 transition-all duration-300 hover:bg-accent"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <Megaphone size="18" className="mr-2 shrink-0 text-primary" />

        <div className="relative flex h-full flex-1 items-center">
          {patchTitlesData.map((patch, index) => {
            const isCurrent = index === currentIndex
            const isPrev =
              index ===
              (currentIndex - 1 + patchTitlesData.length) %
                patchTitlesData.length

            return (
              <div
                key={patch.patch_id}
                className={`absolute w-full cursor-pointer ${
                  isCurrent
                    ? 'animate-slideDown'
                    : isPrev
                      ? 'animate-slideUp'
                      : 'translate-y-full opacity-0'
                }`}
                onClick={() =>
                  push(`/hospital/${hosId}/patches/${patch.patch_id}`)
                }
              >
                <div className="flex items-center justify-between px-2">
                  <p className="w-full truncate text-center text-sm font-medium">
                    {patch.patch_title}
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
      </div>
    </div>
  )
}
