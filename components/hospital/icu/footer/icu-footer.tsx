'use client'

import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/use-toast'
import { useIcuRealtime } from '@/hooks/use-icu-realtime'
import { useRealtimeSubscriptionStore } from '@/lib/store/icu/realtime-subscription'
import { cn } from '@/lib/utils/utils'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import RealtimeStatus from './realtime-status'

export const FOOTER_MAIN_VIEW_MENUS = [
  {
    label: '종합 현황',
    value: 'summary',
  },
  {
    label: '처치표',
    value: 'tx-table',
  },
  {
    label: '입원 차트',
    value: 'chart',
  },
  {
    label: '퇴원 / 면회',
    value: 'out-and-visit',
  },
  {
    label: '차트 검색',
    value: 'search',
  },
  {
    label: '템플릿',
    value: 'template',
  },
  {
    label: '북마크',
    value: 'bookmark',
  },
  {
    label: '입원 통계',
    value: 'analysis',
  },
] as const

export default function IcuFooter({
  hosId,
  targetDate,
}: {
  hosId: string
  targetDate: string
}) {
  const { isSubscriptionReady } = useRealtimeSubscriptionStore()
  const { push, refresh } = useRouter()
  const path = usePathname()
  const currentIcuPath = path.split('/').at(5)
  const searchParams = useSearchParams()
  const params = new URLSearchParams(searchParams)
  useIcuRealtime(hosId)

  useEffect(() => {
    if (isSubscriptionReady) {
      toast({
        title: '차트의 실시간 변경을 감지하고 있습니다',
        className: 'bg-green-600 text-white',
      })

      refresh()
    }
  }, [isSubscriptionReady, refresh])

  return (
    <footer
      className={cn(
        'fixed bottom-0 left-0 right-0 z-20 h-[calc(2.5rem+env(safe-area-inset-bottom))] border-t bg-white md:left-14',
      )}
    >
      <ul className="flex h-10 items-center gap-1 pl-1 md:gap-2">
        <RealtimeStatus isSubscriptionReady={isSubscriptionReady} />

        {FOOTER_MAIN_VIEW_MENUS.map(({ label, value }) => (
          <li
            key={value}
            className={cn(
              value === 'search' ||
                value === 'template' ||
                value === 'analysis' ||
                value === 'bookmark'
                ? 'hidden md:block'
                : '',
            )}
          >
            <Button
              size="sm"
              variant="ghost"
              className={currentIcuPath === value ? 'bg-muted' : ''}
              onClick={() =>
                push(`/hospital/${hosId}/icu/${targetDate}/${value}?${params}`)
              }
            >
              {label}
            </Button>
          </li>
        ))}
      </ul>
    </footer>
  )
}
