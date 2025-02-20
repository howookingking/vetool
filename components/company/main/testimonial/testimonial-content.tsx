import styles from '@/components/company/main/testimonial/ui/bubble.module.css'
import { motion } from 'motion/react'

export default function TestimonialContent() {
  return (
    <div>
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-8 whitespace-pre-line text-2xl font-semibold tracking-tighter text-zinc-800 sm:text-6xl"
      >
        {'업무 효율을 혁신적으로\n개선한 실제 후기'
          .split('')
          .map((child, idx) => (
            <span className={styles.hoverText} key={idx}>
              {child}
            </span>
          ))}
      </motion.div>

      <motion.p
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="max-w-xl text-sm text-muted-foreground sm:text-xl"
      >
        지속적인 연구 개발과, 수의사의 피드백을 바탕으로 만들어진 {''}
        <b>최고 수준의 전문가 도구</b>를 제공합니다.
      </motion.p>

      <br />

      <motion.p
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 1 }}
        className="max-w-xl text-sm text-muted-foreground sm:text-xl"
      >
        종이로 기록하고, 데이터화하지 못했던 다양한 전문가 차트를 {''}
        <b>VETOOL</b>이 직접 <b>디지털화</b>하고 <b>간소화</b>해드립니다.
      </motion.p>
    </div>
  )
}
