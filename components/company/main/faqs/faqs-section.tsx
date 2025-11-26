'use client'

import FaqSolution from '@/components/company/main/faqs/faqs-solution'
import { SOLUTIONS } from '@/constants/company/main'
import { motion } from 'motion/react'
import Section from '../section'
export default function FaqsSection() {
  return (
    <Section id="faqs" isEven>
      <div className="mx-auto w-full max-w-5xl space-y-16">
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-r from-zinc-900 to-zinc-600 bg-clip-text text-center text-3xl font-bold tracking-tighter text-transparent sm:text-4xl md:text-5xl"
        >
          자주 묻는 질문
        </motion.h3>
        {/* <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mx-auto max-w-2xl text-base text-muted-foreground sm:text-xl"
          ></motion.p> */}

        <div className="grid grid-cols-1 gap-6 break-keep md:grid-cols-2">
          {SOLUTIONS.map((solution, index) => {
            return (
              <motion.div
                key={solution.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className="h-full"
              >
                <FaqSolution
                  description={solution.description}
                  icon={solution.icon}
                  title={solution.title}
                />
              </motion.div>
            )
          })}
        </div>
      </div>
    </Section>
  )
}
