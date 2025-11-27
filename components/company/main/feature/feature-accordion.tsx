import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { type Features } from '@/types/company/company'
import { motion } from 'motion/react'

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
  return (
    <motion.div
      className="order-2 flex flex-col gap-8 md:gap-12 lg:order-1"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      variants={container}
    >
      <Accordion
        type="single"
        value={accordionItemIndex}
        onValueChange={setAccordionItemIndex}
        className="flex flex-col"
      >
        {targetFeatures.map((feature) => (
          <motion.div
            key={feature.id}
            variants={item}
            transition={{ duration: 0.5 }}
          >
            <AccordionItem
              value={feature.id.toString()}
              className="rounded-lg px-2"
            >
              <AccordionTrigger className="hover:no-underline">
                <span className="text-base font-semibold tracking-tighter text-slate-800 xl:text-xl">
                  {feature.title}
                </span>
              </AccordionTrigger>

              <AccordionContent className="min-h-24 break-keep pb-2 text-sm tracking-tight text-muted-foreground sm:text-base">
                {feature.description}
              </AccordionContent>
            </AccordionItem>
          </motion.div>
        ))}
      </Accordion>
    </motion.div>
  )
}
