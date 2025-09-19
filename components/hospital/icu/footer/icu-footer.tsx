'use client'

import AnnouncementsCarousel from '@/components/hospital/home/header/announcements-carousel'
import RealtimeStatus from '@/components/hospital/icu/footer/realtime-status'
import { Button } from '@/components/ui/button'
import { useIcuRealtime } from '@/hooks/use-icu-realtime'
import { cn } from '@/lib/utils/utils'
import type { AnnouncementTitles } from '@/types/vetool'
import {
  BarChartHorizontalIcon,
  BookmarkIcon,
  ClipboardListIcon,
  LayoutDashboardIcon,
  ListChecksIcon,
  LogOutIcon,
  SearchIcon,
} from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { toast } from 'sonner'

type IcuFooterProps = {
  hosId: string
  targetDate: string
  announcementTitlesData: AnnouncementTitles[]
}

export default function IcuFooter({
  hosId,
  targetDate,
  announcementTitlesData,
}: IcuFooterProps) {
  const { push, refresh } = useRouter()
  const path = usePathname()

  const isRealtimeReady = useIcuRealtime(hosId)

  const currentIcuPath = path.split('/').at(5)

  useEffect(() => {
    if (isRealtimeReady) {
      toast.success('차트에 실시간 변경을 감지하고 있습니다')
      refresh()
    }
  }, [isRealtimeReady, refresh])

  return (
    <footer className="fixed bottom-0 left-0 right-0 z-40 flex h-[calc(2.5rem+env(safe-area-inset-bottom))] justify-between border-t bg-white 2xl:left-10">
      <ul className="flex h-10 items-center gap-2">
        <li className="mx-2">
          <RealtimeStatus isSubscriptionReady={isRealtimeReady} />
        </li>

        {FOOTER_MAIN_VIEW_MENUS.map(({ label, value, icon, hideInMobile }) => (
          <li
            key={value}
            className={hideInMobile ? 'hidden md:block' : 'block'}
          >
            <Button
              size="sm"
              variant="ghost"
              className={cn(
                currentIcuPath === value ? 'bg-muted' : '',
                'flex items-center gap-1',
              )}
              onClick={() =>
                push(`/hospital/${hosId}/icu/${targetDate}/${value}`)
              }
            >
              {icon}
              {label}
            </Button>
          </li>
        ))}
      </ul>

      <AnnouncementsCarousel announcementTitlesData={announcementTitlesData} />
    </footer>
  )
}

const FOOTER_MAIN_VIEW_MENUS = [
  {
    label: '종합현황',
    value: 'summary',
    icon: <LayoutDashboardIcon />,
    hideInMobile: false,
  },
  {
    label: '처치표',
    value: 'tx-table',
    icon: <ListChecksIcon />,
    hideInMobile: false,
  },
  {
    label: '입원차트',
    value: 'chart',
    icon: <ClipboardListIcon />,
    hideInMobile: false,
  },
  {
    label: '퇴원/면회',
    value: 'out-and-visit',
    icon: <LogOutIcon />,
    hideInMobile: true,
  },
  {
    label: '검색',
    value: 'search',
    icon: <SearchIcon />,
    hideInMobile: true,
  },
  {
    label: '템플릿',
    value: 'template',
    icon: <BookmarkIcon />,
    hideInMobile: true,
  },
  {
    label: '통계',
    value: 'analysis',
    icon: <BarChartHorizontalIcon />,
    hideInMobile: true,
  },
] as const
