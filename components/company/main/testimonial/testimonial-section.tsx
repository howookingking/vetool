'use client'

import TestimonialButtons from '@/components/company/main/testimonial/testimonial-buttons'
import TestimonialCards from '@/components/company/main/testimonial/testimonial-cards'
import TestimonialContent from '@/components/company/main/testimonial/testimonial-content'
import { TESTIMONIALS } from '@/constants/company/testimonials'
import { useState } from 'react'

export default function TestinomialSection() {
  const [selectedCard, setSelectedCard] = useState(0)

  return (
    <section
      id="testimonial"
      className="grid w-screen grid-cols-1 items-center overflow-hidden bg-slate-50 p-8 xl:grid-cols-2 xl:gap-8 xl:px-24 xl:py-24"
    >
      <div>
        <TestimonialContent />
        <TestimonialButtons
          numTracks={TESTIMONIALS.length}
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
