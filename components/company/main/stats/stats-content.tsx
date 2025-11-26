'use client'

import { motion } from 'motion/react'

export default function StatsContent() {
  return (
    <div className="text-center sm:text-left">
      <motion.p
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl"
      >
        시공간의 제약에서 벗어나 <br /> 다양한 기기에서 사용해보세요
      </motion.p>

      <br />

      <motion.p
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="text-base text-muted-foreground sm:text-lg md:text-xl"
      >
        언제 어디서나 PC, 테블릿, 스마트폰을 통해
        <br /> 환자의 실시간 정보를 확인할 수 있습니다
      </motion.p>
    </div>
  )
}
