'use client'

import { motion } from 'motion/react'

export default function PricingHeader() {
  return (
    <div className="flex flex-col justify-center text-center">
      <div className="space-y-4 sm:space-y-6">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.5,
            delay: 0.5,
          }}
          className="text-3xl font-bold tracking-tighter text-primary sm:text-4xl lg:text-5xl xl:text-7xl/none"
        >
          가격 안내
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.5,
            delay: 1.0,
          }}
          className="mx-auto max-w-[600px] text-sm text-muted-foreground sm:text-lg md:text-2xl"
        >
          병원이 필요로 하는 요금제를 맞춰서 선택해주세요.
          <br />
          요금제는 언제든 변경이 가능합니다.
        </motion.p>
      </div>
    </div>
  )
}
