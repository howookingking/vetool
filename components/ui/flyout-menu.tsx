'use client'

import { motion } from 'motion/react'
import Link from 'next/link'
import { useState, type ReactNode } from 'react'
import NavContent from '@/components/company/nav/nav-content'
import { AnimatePresence } from 'motion/react'
import { ChevronDown } from 'lucide-react'

type Props = {
  children: ReactNode
  href: string
  label: string
}

export default function FlyoutMenu({ children, href, label }: Props) {
  const [open, setOpen] = useState(false)

  const isShowNavContent = open

  return (
    <div
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      className="relative h-fit w-fit"
    >
      <Link href={href} className="relative text-black">
        <div className="flex items-center gap-1">
          <span>{label}</span>
          <ChevronDown
            strokeWidth={2}
            size={16}
            className={`transition-transform ${open ? 'rotate-180' : ''}`}
          />
        </div>
        <span
          style={{
            transform: isShowNavContent ? 'scaleX(1)' : 'scaleX(0)',
          }}
          className="absolute -bottom-2 -left-2 -right-2 h-1 origin-left scale-x-0 rounded-full bg-primary transition-transform duration-300 ease-out"
        />
      </Link>
      <AnimatePresence>
        {isShowNavContent && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            style={{ translateX: '-50%' }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="absolute left-1/2 top-12 text-black"
          >
            <div className="absolute -top-6 left-0 right-0 h-6 bg-transparent" />
            <div className="absolute left-1/2 top-0 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-white" />
            <NavContent />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
