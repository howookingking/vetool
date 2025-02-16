'use client'

import PricingCardBackground from '@/components/company/main/pricing/ui/pricing-card-background'
import { motion } from 'motion/react'
import { cn } from '@/lib/utils/utils'

type Props = {
  plan: string
  price: string
  color: string
  description: string
  isDefault?: boolean
}

export default function PricingCard({
  plan,
  price,
  color,
  description,
  isDefault = false,
}: Props) {
  return (
    <motion.div
      whileHover="hover"
      transition={{
        duration: 1,
        ease: 'backInOut',
      }}
      variants={{
        initial: {
          scale: 1,
        },
        hover: {
          scale: 1.05,
        },
      }}
      className={cn(
        'relative h-96 w-96 shrink-0 overflow-hidden rounded-xl p-8',
        color,
        isDefault ? 'shadow-2xl ring-4 ring-yellow-400 ring-offset-4' : '',
      )}
    >
      {isDefault && (
        <div className="absolute -right-8 top-5 rotate-45 bg-yellow-400 px-10 py-1 text-sm font-bold text-black">
          추천
        </div>
      )}
      <div className="relative z-10 text-white">
        <span className="mb-3 block w-fit rounded-full bg-white/80 px-3 py-0.5 text-sm font-bold text-black backdrop-blur-lg">
          {plan}
        </span>
        <motion.span
          initial={{ scale: 0.85 }}
          variants={{
            hover: {
              scale: 1,
            },
          }}
          transition={{
            duration: 1,
            ease: 'backInOut',
          }}
          className="my-2 block origin-top-left font-mono text-5xl font-black leading-[1.2]"
        >
          {price}
        </motion.span>
        <p>{description}</p>
      </div>
      <button className="absolute bottom-4 left-4 right-4 z-20 rounded border-2 border-white bg-white py-2 text-center font-mono font-black uppercase text-neutral-800 backdrop-blur transition-colors hover:bg-white/30 hover:text-white">
        더 알아보기
      </button>
      <PricingCardBackground />
    </motion.div>
  )
}
