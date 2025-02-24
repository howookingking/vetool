import { motion } from 'motion/react'

export default function TranslateWrapper({
  children,
  reverse,
}: {
  children: React.ReactNode
  reverse?: boolean
}) {
  return (
    <motion.li
      initial={{ translateX: reverse ? '-100%' : '0%' }}
      animate={{ translateX: reverse ? '0%' : '-100%' }}
      transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}
      className="flex px-2"
    >
      {children}
    </motion.li>
  )
}
