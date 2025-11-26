'use client'

import BrandHighlight from '@/components/company/main/hero/ui/brand-highlight'
import UnderlineHighlight from '@/components/company/main/hero/ui/underline-highlight'
import { motion } from 'motion/react'

export default function HeroContent() {
  return (
    <div className="mx-auto max-w-5xl space-y-8 py-12 sm:space-y-12 sm:py-24 xl:py-32">
      <div className="space-y-4 sm:space-y-6">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="text-center text-lg font-semibold tracking-tighter text-primary sm:text-left sm:text-xl"
        >
          수의사가 만든 동물병원 업무효율화 도구{' '}
          <BrandHighlight value="VETOOL" className="ml-2" />{' '}
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.5 }}
          className="text-center text-4xl font-bold tracking-tight sm:text-left sm:text-6xl md:text-7xl"
        >
          <div className="mb-2 sm:mb-4">
            시간을 <UnderlineHighlight>절약</UnderlineHighlight>
            하고
          </div>
          <div>
            환자에게만 <UnderlineHighlight delay={1.5}>집중</UnderlineHighlight>
            하세요
          </div>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 1 }}
          className="text-center text-lg text-muted-foreground sm:text-left sm:text-xl"
        >
          #전문분과차트 #업무자동화 #데이터분석{' '}
          <br className="block lg:hidden" />
          #디지털전환 #수의학용어정리 #전문가도구
        </motion.p>
      </div>
    </div>
  )
}
