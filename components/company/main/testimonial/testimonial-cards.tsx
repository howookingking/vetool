import TestimonialCard from '@/components/company/main/testimonial/testimonial-card'
import { TESTIMONIALS } from '@/constants/company/testimonials'
import type { Dispatch, SetStateAction } from 'react'

type Props = {
  selectedCard: number
  setSelectedCard: Dispatch<SetStateAction<number>>
}

export default function TestimonialCards({
  selectedCard,
  setSelectedCard,
}: Props) {
  return (
    <div className="relative h-[400px] p-4 shadow-xl 2xl:h-[500px]">
      {TESTIMONIALS.map((testimonial, position) => (
        <TestimonialCard
          key={position}
          testimonial={testimonial}
          position={position}
          selectedCard={selectedCard}
          setSelectedCard={setSelectedCard}
        />
      ))}
    </div>
  )
}
