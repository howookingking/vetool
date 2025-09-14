'use client'

import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/use-toast'
import { useChecklistRealtime } from '@/hooks/use-checklist-realtime'
import { cn } from '@/lib/utils/utils'
import { BookmarkIcon, CheckIcon, SearchIcon } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect } from 'react'
import ChecklistRealtimeStatus from './checklist-realtime-status'

type Props = {
  hosId: string
  targetDate: string
}

export default function ChecklistFooter({ hosId, targetDate }: Props) {
  const { push, refresh } = useRouter()
  const path = usePathname()

  const isRealtimeReady = useChecklistRealtime(hosId)
  const currentChecklistPath = path.split('/').at(5)

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
    <footer className="fixed bottom-0 left-0 right-0 z-40 flex h-[calc(2.5rem+env(safe-area-inset-bottom))] justify-between border-t bg-white 2xl:left-10">
      <ul className="flex h-10 items-center gap-2">
        <li className="mx-2">
          <ChecklistRealtimeStatus isSubscriptionReady={isRealtimeReady} />
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
                currentChecklistPath === value ? 'bg-muted' : '',
                'flex items-center gap-1',
              )}
              onClick={() =>
                push(`/hospital/${hosId}/checklist/${targetDate}/${value}`)
              }
            >
              {icon}
              {label}
            </Button>
          </li>
        ))}
      </ul>
    </footer>
  )
}
const FOOTER_MAIN_VIEW_MENUS = [
  {
    label: '체크리스트',
    value: 'chart',
    icon: <CheckIcon />,
    hideInMobile: false,
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
] as const
