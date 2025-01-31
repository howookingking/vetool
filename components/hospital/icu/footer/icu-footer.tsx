'use client'

import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/use-toast'
import { useIcuRealtime } from '@/hooks/use-icu-realtime'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect } from 'react'
import PatchesCarousel, {
  type PatchTitles,
} from '../../home/header/patches-carousel'
import RealtimeStatus from './realtime-status'

const FOOTER_MAIN_VIEW_MENUS = [
  {
    label: '종합 현황',
    value: 'summary',
    hideInMobile: false,
  },
  {
    label: '처치표',
    value: 'tx-table',
    hideInMobile: false,
  },
  {
    label: '입원 차트',
    value: 'chart',
    hideInMobile: false,
  },
  {
    label: '퇴원 / 면회',
    value: 'out-and-visit',
    hideInMobile: true,
  },
  {
    label: '차트 검색',
    value: 'search',
    hideInMobile: true,
  },
  {
    label: '템플릿',
    value: 'template',
    hideInMobile: true,
  },
  {
    label: '입원 통계',
    value: 'analysis',
    hideInMobile: true,
  },
] as const

type IcuFooterProps = {
  hosId: string
  targetDate: string
  patchTitlesData: PatchTitles[]
}

export default function IcuFooter({
  hosId,
  targetDate,
  patchTitlesData,
}: IcuFooterProps) {
  const { push, refresh } = useRouter()
  const path = usePathname()

  const isRealtimeReady = useIcuRealtime(hosId)

  const currentIcuPath = path.split('/').at(5)

  useEffect(() => {
    if (isRealtimeReady) {
      toast({
        title: '차트의 실시간 변경을 감지하고 있습니다',
        className: 'bg-green-600 text-white',
      })
      refresh()
    }
  }, [isRealtimeReady, refresh])

  return (
    <footer className="fixed bottom-0 left-0 right-0 z-40 flex h-[calc(2.5rem+env(safe-area-inset-bottom))] justify-between border-t bg-white 2xl:left-14">
      <ul className="flex h-10 items-center gap-1">
        <li className="mx-2">
          <RealtimeStatus isSubscriptionReady={isRealtimeReady} />
        </li>

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
                push(`/hospital/${hosId}/icu/${targetDate}/${value}`)
              }
            >
              {label}
            </Button>
          </li>
        ))}
      </ul>

      <PatchesCarousel hosId={hosId} patchTitlesData={patchTitlesData} />
    </footer>
  )
}
