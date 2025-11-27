import { motion } from 'motion/react'
import SectionTitle from '../section-title'

export default function FeatureTitle() {
  return (
    <div className="flex flex-col items-center gap-4">
      <SectionTitle>전문 분과 차트</SectionTitle>

      <motion.p
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="text-center text-base text-muted-foreground sm:text-xl"
      >
        아날로그 차트의 디지털 전환
        <br />
        단순 반복 작업을 자동화 시켜보세요
      </motion.p>
    </div>
  )
}
