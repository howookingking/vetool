import { type Dispatch, type SetStateAction } from 'react'
import { motion } from 'motion/react'
import Image from 'next/image'

type Props = {
  testimonial: any
  position: number
  selectedCard: number
  setSelectedCard: Dispatch<SetStateAction<number>>
}

export default function TestimonialCard({
  testimonial,
  position,
  selectedCard,
  setSelectedCard,
}: Props) {
  const scale =
    position <= selectedCard ? 1 : 1 + 0.1 * (position - selectedCard)
  const offset =
    position <= selectedCard ? 0 : 115 + (position - selectedCard) * 3
  const background = position % 2 ? 'black' : 'white'
  const color = position % 2 ? 'white' : 'black'

  return (
    <motion.div
      initial={false}
      style={{
        zIndex: position,
        transformOrigin: 'left bottom',
        background,
        color,
      }}
      animate={{
        x: `${offset}%`,
        scale,
      }}
      whileHover={{
        translateX: position === selectedCard ? 0 : -3,
      }}
      transition={{
        duration: 0.25,
        ease: 'easeOut',
      }}
      onClick={() => setSelectedCard(position)}
      className="absolute left-0 top-0 flex min-h-full w-full cursor-pointer flex-col justify-between p-8 lg:p-12"
    >
      <div className="relative mx-auto h-48 w-48 sm:h-72 sm:w-72">
        <Image
          src={testimonial.image}
          alt={testimonial.name}
          fill
          className="rounded-full object-cover"
        />
      </div>

      <p className="my-8 text-sm font-light italic sm:text-lg lg:text-xl">
        &ldquo;{testimonial.description}&rdquo;
      </p>
      <div>
        <span className="text-md block font-semibold sm:text-lg">
          {testimonial.name}
        </span>
        <span className="block text-xs sm:text-sm">{testimonial.title}</span>
      </div>
    </motion.div>
  )
}
