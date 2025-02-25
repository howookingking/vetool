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
        벳툴을 사용해 보시고 여러분도 <b>혁신</b>을 경험해보세요!
      </motion.p>

      <br />

      <motion.p
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 1 }}
        className="max-w-xl text-sm text-muted-foreground sm:text-xl"
      >
        벳툴은 지속적인 연구개발과, 수의사분들의 피드백으로 만들어집니다.
      </motion.p>
    </div>
  )
}
