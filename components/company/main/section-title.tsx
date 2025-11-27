'use client'

import { motion } from 'motion/react'

export default function SectionTitle({
  children,
  duration = 1,
  showingFrom = 'down',
  className,
}: {
  children: React.ReactNode
  duration?: number
  showingFrom?: 'up' | 'down' | 'left' | 'right'
  className?: string
}) {
  return (
    <motion.h2
      initial={{
        opacity: 0,
        y:
          showingFrom === 'up'
            ? -50
            : showingFrom === 'down'
              ? 50
              : showingFrom === 'left'
                ? -50
                : 50,
      }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: duration }}
      className={`text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl ${className}`}
    >
      {children}
    </motion.h2>
  )
}
