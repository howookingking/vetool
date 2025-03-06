import useIsMobile from '@/hooks/use-is-mobile'
import { motion } from 'motion/react'
import Image from 'next/image'
import { type Dispatch, type SetStateAction, type ReactNode } from 'react'

type Props = {
  icon: string
  title: string
  description: string | ReactNode
  index: number
  activeId: number
  setActiveId: Dispatch<SetStateAction<number>>
  imgSrc: string
}

export default function FaqSolution({
  icon,
  title,
  description,
  index,
  activeId,
  setActiveId,
  imgSrc,
}: Props) {
  const isMobile = useIsMobile()

  const isAccordionOpen = index === activeId

  return (
    <div
      onClick={() => setActiveId(index)}
      className="relative cursor-pointer overflow-hidden rounded-lg p-0.5"
    >
      <motion.div
        initial={false}
        animate={{
          height: isAccordionOpen
            ? `${isMobile ? '200px' : '240px'}`
            : `${isMobile ? '36px' : '56px'}`,
        }}
        className="relative z-20 flex flex-col justify-between rounded-[7px] border-b-2 border-stone-400 p-2 shadow-xl sm:p-3"
      >
        <div>
          <motion.p
            initial={false}
            animate={{
              color: isAccordionOpen ? 'rgba(0, 0, 0, 0)' : 'rgba(0, 0, 0, 1)',
            }}
            className="w-fit bg-gradient-to-r from-teal-600 to-teal-700 bg-clip-text text-sm font-medium md:text-lg lg:text-xl"
          >
            <span className="mr-2 text-black lg:mr-4">{icon}</span>
            <span className="bg-clip-text">{title}</span>
          </motion.p>

          <div className="flex justify-between sm:gap-16 xl:gap-24">
            <motion.p
              initial={false}
              animate={{
                opacity: isAccordionOpen ? 1 : 0,
              }}
              className="mt-8 bg-gradient-to-r text-xs font-semibold text-muted-foreground md:text-lg"
            >
              {description}
            </motion.p>

            <div className="relative mr-8 mt-4 hidden h-32 w-32 shrink-0 sm:block">
              <Image
                src={imgSrc}
                alt="faq_image"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={false}
        animate={{
          opacity: isAccordionOpen ? 1 : 0,
        }}
        className="absolute inset-0 z-10 flex bg-gradient-to-r"
      />
      <div className="absolute inset-0 z-0 bg-slate-100" />
    </div>
  )
}
