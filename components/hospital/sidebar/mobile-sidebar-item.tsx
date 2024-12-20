import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils/utils'
import { format } from 'date-fns'
import {
  BarChart4,
  HeartPulse,
  Home,
  ListChecks,
  PawPrint,
  Slice,
  Syringe,
} from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import { Dispatch, SetStateAction } from 'react'

const ICON_MAPPER = {
  Home: <Home size={18} />,
  Syringe: <Syringe size={18} />,
  Slice: <Slice size={18} />,
  HeartPulse: <HeartPulse size={18} />,
  ListChecks: <ListChecks size={18} />,
  BarChart4: <BarChart4 size={18} />,
  PawPrint: <PawPrint size={18} />,
}

export default function MobileSidebarItem({
  item,
  hosId,
  setIsSheetOpen,
  isSuper,
}: {
  item: {
    name: string
    iconName: string
    path: string
    isReady: boolean
  }
  hosId: string
  setIsSheetOpen: Dispatch<SetStateAction<boolean>>
  isSuper: boolean
}) {
  const { push } = useRouter()
  const pathname = usePathname()
  const isActive =
    pathname.split('/').at(3) === item.path ||
    (!pathname.split('/').at(3) && item.name === '병원 홈')
  const dynamicPath =
    item.path === 'icu'
      ? `icu/${format(new Date(), 'yyyy-MM-dd')}/summary`
      : item.path

  return (
    <li key={item.name}>
      <Button
        onClick={() => {
          push(`/hospital/${hosId}/${dynamicPath}`)
          setIsSheetOpen(false)
        }}
        className={cn(
          isActive && 'bg-primary text-white',
          'flex h-12 w-full justify-start gap-4 rounded-none',
          !isSuper && item.name === '벳툴' && 'hidden',
        )}
        variant="ghost"
        disabled={!item.isReady}
      >
        {ICON_MAPPER[item.iconName as keyof typeof ICON_MAPPER]}
        <span>{item.name}</span>
      </Button>
    </li>
  )
}
