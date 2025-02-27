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
        {'사용자들의 생생한\n실제 벳툴 사용후기'.split('').map((child, idx) => (
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
        벳툴을 사용해보시고 <b>혁신</b>을 경험해보세요!
      </motion.p>

      <br />

      <motion.p
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 1 }}
        className="max-w-xl text-sm text-muted-foreground sm:text-xl"
      >
        벳툴은 사용자들의 <b>피드백</b>을 적극적으로 수용하고 있습니다.
      </motion.p>
    </div>
  )
}
