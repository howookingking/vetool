'use client'

import { motion } from 'motion/react'
import { type ReactNode } from 'react'

type Props = {
  children: ReactNode
  delay?: number
}

export default function UnderlineHighlight({ children, delay = 1 }: Props) {
  return (
    <span className="relative inline-block">
      {children}
      <motion.span
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.25, delay }}
        className="absolute -bottom-2 left-0 h-2 w-full origin-left bg-primary"
      />
    </span>
  )
}
