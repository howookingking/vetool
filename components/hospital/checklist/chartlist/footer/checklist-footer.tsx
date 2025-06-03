'use client'

import AnnouncementsCarousel from '@/components/hospital/home/header/announcements-carousel'
import RealtimeStatus from '@/components/hospital/icu/footer/realtime-status'
import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/use-toast'
import { useIcuRealtime } from '@/hooks/use-icu-realtime'
import { type AnnouncementTitles } from '@/types/vetool'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect } from 'react'

const FOOTER_MAIN_VIEW_MENUS = [
  {
    label: '체크리스트',
    value: 'chart',
    hideInMobile: false,
  },
  {
    label: '검색',
    value: 'search',
    hideInMobile: false,
  },
  {
    label: '통계',
    value: 'static',
    hideInMobile: false,
  },
  {
    label: '설정',
    value: 'setting',
    hideInMobile: true,
  },
] as const

type IcuFooterProps = {
  hosId: string
  targetDate: string
  announcementTitlesData: AnnouncementTitles[]
}

export default function ChecklistFooter({
  hosId,
  targetDate,
  announcementTitlesData,
}: IcuFooterProps) {
  const { push, refresh } = useRouter()
  const path = usePathname()

  // const isRealtimeReady = useIcuRealtime(hosId)

  const currentIcuPath = path.split('/').at(5)

  // useEffect(() => {
  //   if (isRealtimeReady) {
  //     toast({
  //       title: '차트의 실시간 변경을 감지하고 있습니다',
  //       className: 'bg-green-600 text-white',
  //     })
  //     refresh()
  //   }
  // }, [isRealtimeReady, refresh])

  return (
    <footer className="fixed bottom-0 left-0 right-0 z-40 flex h-[calc(2.5rem+env(safe-area-inset-bottom))] justify-between border-t bg-white 2xl:left-10">
      <ul className="flex h-10 items-center gap-1">
        {/* <li className="mx-2">
          <RealtimeStatus isSubscriptionReady={isRealtimeReady} />
        </li> */}

        {FOOTER_MAIN_VIEW_MENUS.map(({ label, value, hideInMobile }) => (
          <li
            key={value}
            className={hideInMobile ? 'hidden md:block' : 'block'}
          >
            <Button
              size="sm"
              variant="ghost"
              className={currentIcuPath === value ? 'bg-muted' : ''}
              onClick={() =>
                push(`/hospital/${hosId}/checklist/${targetDate}/${value}`)
              }
            >
              {label}
            </Button>
          </li>
        ))}
      </ul>

      <AnnouncementsCarousel announcementTitlesData={announcementTitlesData} />
    </footer>
  )
}
