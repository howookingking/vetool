import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { FEATURES } from '@/constants/company/main'
import { motion } from 'motion/react'

type Props = {
  isAccordionOpen: string
  setIsAccordionOpen: (value: string) => void
}

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

export default function FeatureAccordion({
  isAccordionOpen,
  setIsAccordionOpen,
}: Props) {
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
        value={isAccordionOpen}
        onValueChange={setIsAccordionOpen}
        className="flex flex-col gap-2 sm:gap-4"
      >
        {FEATURES.map((feature) => (
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
              </AccordionContent>
            </AccordionItem>
          </motion.div>
        ))}
      </Accordion>
    </motion.div>
  )
}
