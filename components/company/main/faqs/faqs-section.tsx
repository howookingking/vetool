'use client'

import FaqSolution from '@/components/company/main/faqs/faqs-solution'
import { SOLUTIONS } from '@/constants/company/main'
import { motion } from 'motion/react'
import Section from '../section'
import SectionTitle from '../section-title'
export default function FaqsSection() {
  return (
    <Section id="faqs" isEven>
      <div className="mx-auto w-full max-w-5xl space-y-16">
        <SectionTitle className="text-center">자주 묻는 질문</SectionTitle>

        <div className="grid grid-cols-1 gap-4 break-keep md:grid-cols-2 md:gap-6">
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
