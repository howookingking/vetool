'use client'

import FaqSolution from '@/components/company/main/faqs/faqs-solution'
import { SOLUTIONS } from '@/constants/company/main'
import { motion } from 'motion/react'
import { useState } from 'react'

export default function Faqs() {
  const [activeId, setActiveId] = useState<number>(SOLUTIONS[0].id)

  return (
    <section
      id="faqs"
      className="flex h-company flex-col justify-center px-8 py-12 sm:justify-start"
    >
      <div className="mx-auto grid w-full max-w-5xl grid-cols-1 gap-8 lg:gap-16">
        <div className="space-y-2 sm:space-y-4">
          <motion.h3
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-2xl font-bold tracking-tighter text-zinc-800 sm:text-6xl"
          >
            FAQ
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-sm text-muted-foreground sm:text-xl"
          >
            자주 묻는 질문과 답변을 모았습니다
          </motion.p>
        </div>

        <div className="flex flex-col gap-4">
          {SOLUTIONS.map((solution, index) => {
            return (
              <motion.div
                key={solution.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 * index + 0.2 }}
              >
                <FaqSolution
                  {...solution}
                  activeId={activeId}
                  setActiveId={setActiveId}
                  index={solution.id}
                />
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
