'use client'

import { Button } from '@/components/ui/button'
import CustomTooltip from '@/components/ui/custom-tooltip'
import { cn } from '@/lib/utils/utils'
import { format } from 'date-fns'
import { usePathname, useRouter } from 'next/navigation'

type Props = {
  hosId: string
  name: string
  path: string
  isReady: boolean
  isSuper: boolean
  icon: JSX.Element
}

export default function DesktopSidebarItem({
  hosId,
  name,
  path,
  isReady,
  isSuper,
  icon,
}: Props) {
  const pathname = usePathname()
  const { push } = useRouter()

  const isActive =
    pathname.split('/').at(3) === path ||
    (!pathname.split('/').at(3) && name === '병원 홈')

  const dynamicPath =
    path === 'icu' ? `icu/${format(new Date(), 'yyyy-MM-dd')}/summary` : path

  return (
    <li key={name}>
      <CustomTooltip
        contents={name}
        side="right"
        sideOffset={4}
        delayDuration={300}
      >
        <Button
          onClick={() => push(`/hospital/${hosId}/${dynamicPath}`)}
          className={cn(
            'h-8 w-8 bg-white',
            isActive && 'bg-primary text-white',
            !isSuper && name === '벳툴' && 'hidden',
          )}
          variant="ghost"
          disabled={!isReady}
          aria-label={name}
        >
          {icon}
        </Button>
      </CustomTooltip>
    </li>
  )
}
