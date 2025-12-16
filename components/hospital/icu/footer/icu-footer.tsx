'use client'

import RealtimeStatus from '@/components/hospital/icu/footer/realtime-status'
import { Button } from '@/components/ui/button'
import useIcuRealtime from '@/hooks/use-icu-realtime'
import { useSafeRefresh } from '@/hooks/use-realtime-refresh'
import { cn } from '@/lib/utils/utils'
import { DashboardIcon } from '@radix-ui/react-icons'
import {
  BarChartHorizontalIcon,
  BookmarkIcon,
  ClipboardListIcon,
  ListChecksIcon,
  SearchIcon,
} from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'

type IcuFooterProps = {
  hosId: string
  targetDate: string
}

export default function IcuFooter({ hosId, targetDate }: IcuFooterProps) {
  const safeRefresh = useSafeRefresh()

  const { push } = useRouter()
  const path = usePathname()

  useIcuRealtime(hosId)

  const currentIcuPath = path.split('/').at(5)

  const handleMoveToPath = (route: string) => {
    push(`/hospital/${hosId}/icu/${targetDate}/${route}` as any)
    safeRefresh()
  }

  return (
    <footer className="fixed bottom-0 left-0 right-0 z-40 flex h-[calc(2.5rem+env(safe-area-inset-bottom))] justify-between border-t bg-white px-1 2xl:left-10">
      <ul className="flex h-10 items-center gap-1">
        {FOOTER_MAIN_VIEW_MENUS.map(({ label, route, icon, hideInMobile }) => (
          <li
            key={route}
            className={hideInMobile ? 'hidden md:block' : 'block'}
          >
            <Button
              disabled={route === 'analysis'}
              size="sm"
              variant="ghost"
              className={cn(
                currentIcuPath === route && 'bg-muted',
                'flex items-center gap-1',
              )}
              onClick={() => handleMoveToPath(route)}
            >
              {icon}
              {label}
            </Button>
          </li>
        ))}
      </ul>

      <RealtimeStatus />
    </footer>
  )
}

const FOOTER_MAIN_VIEW_MENUS = [
  {
    label: '종합현황',
    route: 'summary',
    icon: <DashboardIcon />,
    hideInMobile: false,
  },
  {
    label: '처치표',
    route: 'tx-table',
    icon: <ListChecksIcon />,
    hideInMobile: false,
  },
  {
    label: '입원차트',
    route: 'chart',
    icon: <ClipboardListIcon />,
    hideInMobile: false,
  },
  // {
  //   label: '퇴원/면회',
  //   route: 'out-and-visit',
  //   icon: <LogOutIcon />,
  //   hideInMobile: true,
  // },
  {
    label: '검색',
    route: 'search',
    icon: <SearchIcon />,
    hideInMobile: true,
  },
  {
    label: '템플릿',
    route: 'template',
    icon: <BookmarkIcon />,
    hideInMobile: true,
  },
  {
    label: '통계',
    route: 'analysis',
    icon: <BarChartHorizontalIcon />,
    hideInMobile: true,
  },
] as const
