import { cn } from '@/lib/utils/utils'
import React from 'react'

type Props = {
  children: React.ReactNode
  className?: string
  id?: string
  isEven?: boolean
}

export default function Section({ children, className, id, isEven }: Props) {
  return (
    <section
      className={cn(
        'pb-24 pt-16',
        isEven ? 'bg-slate-50' : 'bg-white',
        className,
      )}
      id={id}
    >
      {children}
    </section>
  )
}
