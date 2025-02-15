import { type Dispatch, type SetStateAction } from 'react'
import TestimonialCard from './testimonial-card'
import { TESTIMONIALS } from '@/constants/company/main'

type Props = {
  selectedCard: number
  setSelectedCard: Dispatch<SetStateAction<number>>
}

export default function TestimonialCards({
  selectedCard,
  setSelectedCard,
}: Props) {
  return (
    <div className="relative h-[450px] p-4 shadow-xl md:h-[640px] lg:h-[720px]">
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
