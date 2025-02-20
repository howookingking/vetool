'use client'

import TestimonialButtons from '@/components/company/main/testimonial/testimonial-buttons'
import TestimonialCards from '@/components/company/main/testimonial/testimonial-cards'
import TestimonialContent from '@/components/company/main/testimonial/testimonial-content'
import { TESTIMONIALS_LENGTH } from '@/constants/company/main'
import { useState } from 'react'

export default function Testinomial() {
  const [selectedCard, setSelectedCard] = useState(0)

  return (
    <section
      id="testimonial"
      className="grid h-company grid-cols-1 items-center gap-4 overflow-hidden bg-gray-50/50 p-8 xl:grid-cols-2 xl:gap-8 xl:px-24"
    >
      <div>
        <TestimonialContent />
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
