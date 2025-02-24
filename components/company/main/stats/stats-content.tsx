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
        className="text-2xl font-bold tracking-tighter sm:text-5xl"
      >
        디지털과 진료 데이터의 <br /> 완벽한 결합
      </motion.p>

      <br />

      <motion.p
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="text-xs text-muted-foreground sm:text-xl"
      >
        VETOOL과 함께 병원에서 사무실까지 정확한 정보와 함께하세요.
        <br />
        다양한 장소에서 모든 종류의 기기에서 접근하여 <br /> 실시간 업데이트 및
        정보 공유가 가능합니다.
      </motion.p>
    </div>
  )
}
