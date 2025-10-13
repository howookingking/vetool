import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils/utils'
import { format } from 'date-fns'
import { usePathname, useRouter } from 'next/navigation'
import type { Dispatch, SetStateAction } from 'react'

type Props = {
  name: string
  path: string
  icon: JSX.Element
  hosId: string
  setIsSheetOpen: Dispatch<SetStateAction<boolean>>
  isSuper: boolean
  isReady: boolean
}

export default function MobileSidebarItem({
  hosId,
  setIsSheetOpen,
  isSuper,
  icon,
  name,
  path,
  isReady,
}: Props) {
  const { push } = useRouter()
  const pathname = usePathname()

  const isActive =
    pathname.split('/').at(3) === path ||
    (!pathname.split('/').at(3) && name === '병원 홈')

  const dynamicPath =
    path === 'icu' ? `icu/${format(new Date(), 'yyyy-MM-dd')}/summary` : path

  return (
    <li key={name}>
      <Button
        onClick={() => {
          push(`/hospital/${hosId}/${dynamicPath}`)
          setIsSheetOpen(false)
        }}
        className={cn(
          isActive && 'bg-primary text-white',
          'flex h-12 w-full justify-start gap-4 rounded-none',
          !isSuper && name === '벳툴' && 'hidden',
        )}
        variant="ghost"
        disabled={!isReady}
      >
        {icon}
        <span>{name}</span>
      </Button>
    </li>
  )
}
