import { motion } from 'motion/react'
import SectionTitle from '../section-title'

export default function TestimonialContent() {
  return (
    <div>
      <SectionTitle
        duration={1}
        showingFrom="left"
        className="pb-8 text-center lg:text-left"
      >
        사용자들의 생생한 <br />
        실제 벳툴 사용후기
      </SectionTitle>

      <div className="flex flex-col gap-2 break-keep text-center text-base tracking-tight text-muted-foreground sm:text-lg md:text-lg lg:text-left">
        <motion.p
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          벳툴을 사용해보시고 혁신을 경험해보세요
        </motion.p>

        <motion.p
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 1 }}
        >
          벳툴은 여러분의 피드백에 귀를 기울이고 있습니다
        </motion.p>
      </div>
    </div>
  )
}
