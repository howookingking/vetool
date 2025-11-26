'use client'

import StatsCounter from '@/components/company/main/stats/ui/stats-counter'
import { Separator } from '@/components/ui/separator'
import { motion } from 'motion/react'

const COUNTS = {
  countedAt: '2025년 11월 26일',
  icuChartCount: 15525,
  icuOrderCount: 293687,
  icuTxCount: 427744,
}

export default function StatsCounts() {
  const stats = [
    {
      value: COUNTS.icuChartCount,
      suffix: '',
      decimals: 0,
      label: '입원차트 수',
    },
    {
      value: COUNTS.icuOrderCount,
      suffix: '',
      decimals: 0,
      label: '오더 수',
    },
    {
      value: COUNTS.icuTxCount,
      suffix: '',
      decimals: 0,
      label: '처치 수',
    },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center"
    >
      <div className="flex items-center justify-center gap-4 py-8 sm:mx-auto sm:gap-0 sm:py-12">
        {stats.map((item, index) => (
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
                  className="text-3xl font-bold text-zinc-800 sm:text-5xl md:text-6xl"
                >
                  <StatsCounter value={item.value} decimals={item.decimals} />

                  {item.suffix}
                </motion.span>
              </div>

              <span className="text-sm text-muted-foreground sm:px-8 sm:text-base md:text-lg">
                {item.label}
              </span>
            </div>

            {index !== stats.length - 1 && (
              <Separator
                orientation="vertical"
                className="mx-6 hidden h-16 sm:block"
              />
            )}
          </div>
        ))}
      </div>

      <p className="mb-12 text-center text-xs text-muted-foreground sm:text-sm">
        {COUNTS.countedAt} 기준
      </p>
    </motion.div>
  )
}
