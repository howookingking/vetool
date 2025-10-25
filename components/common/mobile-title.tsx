import { IconProps } from '@radix-ui/react-icons/dist/types'
import type { LucideIcon } from 'lucide-react'
import type { ForwardRefExoticComponent, RefAttributes } from 'react'

type Props = {
  title: string
  icon:
    | ForwardRefExoticComponent<IconProps & RefAttributes<SVGSVGElement>>
    | LucideIcon
}

export default function MobileTitle({ title, icon: Icon }: Props) {
  return (
    <div className="fixed left-1/2 top-6 z-50 flex -translate-x-1/2 -translate-y-1/2 items-center gap-1.5 font-semibold 2xl:hidden">
      <Icon size={18} />
      {title}
    </div>
  )
}
