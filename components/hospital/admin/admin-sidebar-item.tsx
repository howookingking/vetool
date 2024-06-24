'use client'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { LucideProps } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ForwardRefExoticComponent, RefAttributes } from 'react'

export default function AdminSidebarItem({
  name,
  path,
  icon: Icon,
}: {
  name: string
  path: string
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>
  >
}) {
  const pathname = usePathname()
  const isActive = pathname.split('/').at(-1) === path

  return (
    <li className="flex h-10 w-full items-center gap-2">
      <Button
        className="felx items center w-full justify-start gap-3 px-2"
        variant="ghost"
        asChild
      >
        <Link href={path} className={cn('w-full', isActive && 'bg-muted')}>
          <Icon size={18} />
          <span>{name}</span>
        </Link>
      </Button>
    </li>
  )
}
