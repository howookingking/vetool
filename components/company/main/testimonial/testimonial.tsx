'use client'

import TestimonialButtons from '@/components/company/main/testimonial/ui/testimonial-buttons'
import TestimonialCards from '@/components/company/main/testimonial/ui/testimonial-cards'
import styles from '@/components/company/main/testimonial/ui/bubble.module.css'
import { TESTIMONIALS_LENGTH } from '@/constants/company/main'
import { useState } from 'react'

export default function Testinomial() {
  const [selectedCard, setSelectedCard] = useState(0)

  return (
    <section className="mt-12 grid h-[calc(100vh-32px)] grid-cols-1 items-center gap-2 overflow-hidden bg-white px-4 pb-12 lg:grid-cols-2 lg:gap-4 lg:px-24">
      <div className="p-4">
        <div className="mb-8 whitespace-pre-line text-4xl font-semibold tracking-tighter text-zinc-800 sm:text-6xl">
          {'업무 효율을 혁신적으로\n개선한 실제 후기'
            .split('')
            .map((child, idx) => (
              <span className={styles.hoverText} key={idx}>
                {child}
              </span>
            ))}
        </div>

        <p className="text-sm text-muted-foreground sm:text-lg">
          지속적인 연구 개발과, 수의사의 피드백을 바탕으로 만들어진
          <br />
          <b>최고 수준의 전문가 도구</b>를 제공합니다.
          <br />
          <br />
          종이로 기록하고, 데이터화하지 못했던 다양한 전문가 차트를
          <br />
          <b>VETOOL</b>이 직접 <b>디지털화</b>하고 <b>간소화</b>해드립니다.
        </p>
        <TestimonialButtons
          numTracks={TESTIMONIALS_LENGTH}
          setSelectedCard={setSelectedCard}
          selectedCard={selectedCard}
        />
      </div>

      <TestimonialCards
        selectedCard={selectedCard}
        setSelectedCard={setSelectedCard}
      />
    </section>
  )
}
