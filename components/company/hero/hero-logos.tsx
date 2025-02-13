'use client'

import { ArrowUpRight } from 'lucide-react'
import TranslateWrapper from '@/components/company/hero/ui/translate-wrapper'

const HOSPITAL_LIST = [
  'SNC 동물 메디컬센터',
  '광진 동물 의료센터',
  '로얄 동물 메디컬센터 강동',
  '메이 동물 메디컬센터',
  '24시 코끼리 동물 의료센터',
  '호우킹 병원',
]

export default function HeroLogos() {
  return (
    <div className="relative mt-auto scale-[1.01] border-y-2 border-zinc-900 bg-white">
      <ul className="relative z-0 flex overflow-hidden">
        {Array.from({ length: 3 }).map((_, index) => (
          <TranslateWrapper key={index} reverse>
            {HOSPITAL_LIST.map((item) => (
              <span
                key={item}
                className="flex items-center justify-center gap-4 px-4 py-2 md:py-4"
              >
                <ArrowUpRight className="text-2xl text-indigo-600 md:text-3xl" />
                <span className="whitespace-nowrap text-xl font-semibold uppercase md:text-2xl">
                  {item}
                </span>
              </span>
            ))}
          </TranslateWrapper>
        ))}
      </ul>

      <div className="pointer-events-none absolute bottom-0 left-0 top-0 z-10 w-32 bg-gradient-to-r from-white to-white/0" />
      <div className="pointer-events-none absolute bottom-0 right-0 top-0 z-10 w-32 bg-gradient-to-l from-white to-white/0" />
    </div>
  )
}
