import { motion } from 'motion/react'

export default function FeatureTitle() {
  return (
    <div className="mx-auto w-full max-w-[1600px]">
      <div className="flex flex-col gap-4 px-8 xl:max-w-[500px]">
        <motion.h3
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl"
        >
          전문 분과 차트
        </motion.h3>

        <motion.p
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center text-base text-muted-foreground sm:text-xl"
        >
          아날로그 차트의 디지털 전환
          <br />
          단순 반복 작업을 자동화 시켜보세요
        </motion.p>
      </div>
    </div>
  )
}
