'use client'

import { motion } from 'motion/react'

export default function StatsTitle() {
  return (
    <motion.h2
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1 }}
      className="text-center text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl"
    >
      벳툴과 함께 <br /> 업무 효율을 높여보세요
    </motion.h2>
  )
}
