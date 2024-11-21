'use client'

import { POPUP_MOTION } from '@/constants/hospital/icu/notification/aniimations'
import { useOutsideClick } from '@/hooks/use-outside-click'
import { cn } from '@/lib/utils/utils'
import { motion } from 'framer-motion'
import { Dispatch, SetStateAction, useRef } from 'react'
import Notifications from './notifications'

export default function NotificationPopup({
  isPopupOpen,
  setIsPopupOpen,
  setUnreadCount,
  hosId,
}: {
  isPopupOpen: boolean
  setIsPopupOpen: Dispatch<SetStateAction<boolean>>
  setUnreadCount: Dispatch<SetStateAction<number>>
  hosId: string
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  useOutsideClick(containerRef, () => {
    setIsPopupOpen(false)
  })

  return (
    <motion.div
      initial={false}
      animate={isPopupOpen ? 'open' : 'closed'}
      ref={containerRef}
      className={cn(
        'fixed bottom-0 right-0 top-1/2 z-20 w-[324px] overflow-y-auto p-3',
        !isPopupOpen && 'pointer-events-none',
      )}
    >
      <motion.div
        className={cn(
          'fixed bottom-0 right-0 top-1/2 w-[324px] rounded-tl-lg bg-primary',
          !isPopupOpen && 'pointer-events-none',
        )}
        variants={POPUP_MOTION}
      />
      <Notifications
        hosId={hosId}
        isPopupOpen={isPopupOpen}
        setIsPopupOpen={setIsPopupOpen}
        setUnreadCount={setUnreadCount}
      />
    </motion.div>
  )
}
