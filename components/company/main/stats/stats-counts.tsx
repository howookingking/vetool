'use client'

import { Separator } from '@/components/ui/separator'
import { Plus } from 'lucide-react'
import { motion } from 'motion/react'
import { STATS } from '@/constants/company/main'
import StatsCounter from '@/components/company/main/stats/ui/stats-counter'

export default function StatsCounts() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="-mx-8 flex items-center justify-center gap-4 py-4 sm:mx-auto sm:gap-0 sm:py-12"
    >
      {STATS.map((item, index) => (
        <div
          key={item.value}
          className="flex items-center justify-center sm:w-auto"
        >
          <div className="w-full text-center">
            <div className="flex items-center justify-center sm:py-0">
              <motion.span
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5 }}
                className="text-lg font-semibold text-zinc-800 sm:text-5xl"
              >
                <StatsCounter value={item.value} decimals={item.decimals} />

                {item.suffix}
              </motion.span>

              <Plus strokeWidth={3} className="h-4 w-4 sm:h-10 sm:w-10" />
            </div>

            <span className="text-[10px] text-muted-foreground sm:px-8 sm:text-lg">
              {item.label}
            </span>
          </div>

          {index !== STATS.length - 1 && (
            <Separator
              orientation="vertical"
              className="mx-6 hidden h-16 sm:block"
            />
          )}
        </div>
      ))}
    </motion.div>
  )
}
