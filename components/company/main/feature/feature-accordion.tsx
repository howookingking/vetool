import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { type Features } from '@/types/company/company'
import { motion } from 'motion/react'
import { useRouter } from 'next/navigation'
import SlideButton from './ui/slide-button'

const container = {
  hidden: { opacity: 0 },

  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
}

const item = {
  hidden: { opacity: 0, x: -50 },
  show: { opacity: 1, x: 0 },
}

type Props = {
  accordionItemIndex: string
  setAccordionItemIndex: (value: string) => void
  targetFeatures: Features[]
}

export default function FeatureAccordion({
  accordionItemIndex,
  setAccordionItemIndex,
  targetFeatures,
}: Props) {
  const { push } = useRouter()

  return (
    <motion.div
      className="order-2 flex flex-col gap-8 md:gap-12 xl:order-1"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      variants={container}
    >
      <Accordion
        type="single"
        value={accordionItemIndex}
        onValueChange={setAccordionItemIndex}
        className="flex flex-col gap-2 sm:gap-4"
      >
        {targetFeatures.map((feature) => (
          <motion.div
            key={feature.id}
            variants={item}
            transition={{ duration: 0.5 }}
          >
            <AccordionItem
              value={feature.id.toString()}
              className="rounded-lg px-6"
            >
              <AccordionTrigger className="py-3 hover:no-underline sm:py-4">
                <span className="text-sm font-semibold tracking-tighter text-zinc-800 sm:text-xl xl:text-2xl">
                  {feature.title}
                </span>
              </AccordionTrigger>

              <AccordionContent className="min-h-20 text-xs font-semibold text-muted-foreground sm:text-base xl:min-h-28 xl:text-lg">
                {feature.description}

                {accordionItemIndex === '1' &&
                  feature.title === '입원 환자 차트 관리' && (
                    <SlideButton
                      onClick={() => push(`/test/io?target-date=2025-02-25`)}
                      className="ml-1 mt-4 hidden 2xl:flex"
                    >
                      체험해보기
                    </SlideButton>
                  )}
              </AccordionContent>
            </AccordionItem>
          </motion.div>
        ))}
      </Accordion>
    </motion.div>
  )
}
