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
          className="text-center text-3xl font-bold tracking-tighter sm:text-5xl xl:text-7xl"
        >
          전문 분과 차트
        </motion.h3>

        <motion.p
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center text-xs text-muted-foreground sm:text-base xl:text-xl"
        >
          VETOOL로 바뀌게 될 근무 환경, <br /> 다수의 병원이 선택한 이유를
          확인해보세요.
        </motion.p>
      </div>
    </div>
  )
}
