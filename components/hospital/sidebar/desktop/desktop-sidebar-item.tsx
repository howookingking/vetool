import { Button } from '@/components/ui/button'
import CustomTooltip from '@/components/ui/custom-tooltip'
import { cn } from '@/lib/utils/utils'
import { format } from 'date-fns'
import { useParams, usePathname, useRouter } from 'next/navigation'

export default function SidebarItem({
  name,
  path,
  isReady,
  isSuper,
  icon,
}: {
  name: string
  path: string
  isReady: boolean
  isSuper: boolean
  icon: JSX.Element
}) {
  const pathname = usePathname()
  const { hos_id } = useParams()
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
          onClick={() => push(`/hospital/${hos_id}/${dynamicPath}`)}
          className={cn(
            isActive && 'bg-primary text-white',
            'h-12 w-full rounded-none',
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
