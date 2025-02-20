'use client'

import { motion } from 'motion/react'

export default function StatsTitle() {
  return (
    <motion.h2
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1 }}
      className="text-center text-2xl font-bold tracking-tighter sm:text-6xl md:text-4xl"
    >
      디지털 차트를 통해 <br /> 동물 병원은 변화중
    </motion.h2>
  )
}
