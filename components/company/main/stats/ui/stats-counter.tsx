'use client'

import { Separator } from '@/components/ui/separator'
import { Plus } from 'lucide-react'
import { motion, useAnimate, useInView } from 'motion/react'
import { useEffect, useRef, useState } from 'react'

const STATS_DATA = [
  { value: 3000, suffix: '', label: '생성된 전자 차트' },
  { value: 60.7, suffix: 'K', decimals: 1, label: '수의사가 내린 오더 수' },
  { value: 400, suffix: '시간', label: '벳툴 사용으로 절약한 시간' },
]

export default function StatsCounter() {
  const [scope] = useAnimate()
  const [displayValues, setDisplayValues] = useState<number[]>(
    STATS_DATA.map(() => 0),
  )
  const ref = useRef(null)
  const isInView = useInView(ref)

  useEffect(() => {
    if (!isInView) return

    const duration = 1.5
    const steps = 81

    const updateCounters = async () => {
      for (let i = 0; i <= steps; i += 1) {
        const progress = i / steps
        const newValues = STATS_DATA.map((item) => progress * item.value)

        setDisplayValues(newValues)

        await new Promise((resolve) =>
          setTimeout(resolve, (duration * 1000) / steps),
        )
      }
      setDisplayValues(STATS_DATA.map((item) => item.value))
    }

    updateCounters()
  }, [STATS_DATA, isInView])

  return (
    <motion.div
      ref={scope}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mx-auto flex flex-col items-center justify-between px-4 py-4 sm:flex-row sm:py-12"
    >
      {STATS_DATA.map((item, index) => (
        <div key={item.value} className="flex">
          <div className="text-center">
            <div className="flex items-center pt-4 sm:py-0">
              <span
                ref={ref}
                className="mb-2 text-4xl font-semibold text-zinc-800 lg:text-5xl"
              >
                {item.decimals
                  ? displayValues[index].toFixed(item.decimals)
                  : Math.round(displayValues[index]).toLocaleString()}

                {item.suffix}
              </span>

              <Plus
                strokeWidth={3}
                className="-ml-1 mb-1 h-6 w-6 sm:h-10 sm:w-10"
              />
            </div>

            <span className="mt-2 text-muted-foreground">{item.label}</span>
          </div>

          {index !== STATS_DATA.length - 1 && (
            <Separator
              orientation="vertical"
              className="mx-6 my-auto hidden h-16 sm:block"
            />
          )}
        </div>
      ))}
    </motion.div>
  )
}
