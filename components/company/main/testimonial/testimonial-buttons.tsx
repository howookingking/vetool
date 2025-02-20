import { Dispatch, SetStateAction } from 'react'
import { motion } from 'motion/react'

type Props = {
  numTracks: number
  setSelectedCard: Dispatch<SetStateAction<number>>
  selectedCard: number
}

export default function TestimonialButtons({
  numTracks,
  setSelectedCard,
  selectedCard,
}: Props) {
  return (
    <div className="mt-4 flex gap-1 sm:mt-8">
      {Array.from(Array(numTracks).keys()).map((n) => {
        return (
          <button
            key={n}
            onClick={() => setSelectedCard(n)}
            className="relative h-2 w-full bg-slate-300"
          >
            {selectedCard === n ? (
              <motion.span
                className="absolute bottom-0 left-0 top-0 bg-primary"
                initial={{
                  width: '0%',
                }}
                animate={{
                  width: '100%',
                }}
                transition={{
                  duration: 5,
                }}
                onAnimationComplete={() => {
                  setSelectedCard(
                    selectedCard === numTracks - 1 ? 0 : selectedCard + 1,
                  )
                }}
              />
            ) : (
              <span
                className="absolute bottom-0 left-0 top-0 bg-primary"
                style={{
                  width: selectedCard > n ? '100%' : '0%',
                }}
              />
            )}
          </button>
        )
      })}
    </div>
  )
}
