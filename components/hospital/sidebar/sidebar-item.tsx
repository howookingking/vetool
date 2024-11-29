'use client'

import { Button } from '@/components/ui/button'
import CustomTooltip from '@/components/ui/custom-tooltip'
import { cn } from '@/lib/utils/utils'
import { format } from 'date-fns'
import {
  BarChart4,
  Building,
  HeartPulse,
  Home,
  ListChecks,
  Monitor,
  PawPrint,
  Slice,
  Syringe,
} from 'lucide-react'
import { useParams, usePathname, useRouter } from 'next/navigation'
import { useMemo } from 'react'

// server component에서 props로 전달이 안됨
export const ICON_MAPPER = {
  Home: <Home size={18} />,
  Syringe: <Syringe size={18} />,
  Slice: <Slice size={18} />,
  HeartPulse: <HeartPulse size={18} />,
  ListChecks: <ListChecks size={18} />,
  BarChart4: <BarChart4 size={18} />,
  PawPrint: <PawPrint size={18} />,
  Building: <Building size={18} />,
  Monitor: <Monitor size={18} />,
}

export default function SidebarItem({
  name,
  path,
  iconName,
  isReady,
  isSuper,
  isSuperOnly,
  unReadFeedbacks,
}: {
  name: string
  path: string
  iconName: string
  isReady: boolean
  isSuper: boolean
  isSuperOnly: boolean
  unReadFeedbacks: number
}) {
  const pathname = usePathname()
  const { hos_id } = useParams()
  const { push } = useRouter()

  const isActive = useMemo(
    () =>
      pathname.split('/').at(3) === path ||
      (!pathname.split('/').at(3) && name === '병원 홈'),
    [name, path, pathname],
  )

  const dynamicPath = useMemo(
    () =>
      path === 'icu' ? `icu/${format(new Date(), 'yyyy-MM-dd')}/summary` : path,
    [path],
  )

  return (
    <li key={name} className={isSuperOnly && !isSuper ? 'hidden' : ''}>
      <CustomTooltip
        contents={name}
        side="right"
        sideOffset={4}
        delayDuration={300}
      >
        <div className="relative">
          {isSuperOnly && unReadFeedbacks > 0 && (
            <div className="absolute right-1 top-1 flex h-[20px] w-[20px] items-center justify-center rounded-full bg-rose-500 px-1 text-xs text-white">
              {unReadFeedbacks}
            </div>
          )}
          <Button
            onClick={() => push(`/hospital/${hos_id}/${dynamicPath}`)}
            className={cn(
              isActive && 'bg-primary text-white',
              'h-12 w-full rounded-none',
            )}
            variant="ghost"
            disabled={!isReady}
          >
            {ICON_MAPPER[iconName as keyof typeof ICON_MAPPER]}
          </Button>
        </div>
      </CustomTooltip>
    </li>
  )
}
