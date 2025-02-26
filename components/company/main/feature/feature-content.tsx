import FeatureAccordion from '@/components/company/main/feature/feature-accordion'
import FeatureImages from '@/components/company/main/feature/feature-images'
import { type Features } from '@/types/company/company'
import { motion } from 'motion/react'

type Props = {
  item: {
    path: string
    isReady: boolean
    name: string
  }
  accordionItemIndex: string
  setAccordionItemIndex: (value: string) => void
  targetFeatures: Features[]
  targetFeature: Features
}

export default function FeatureContent({
  item,
  accordionItemIndex,
  setAccordionItemIndex,
  targetFeatures,
  targetFeature,
}: Props) {
  return (
    <motion.div
      key={item.path}
      className="grid gap-4 xl:grid-cols-3"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <FeatureAccordion
        accordionItemIndex={accordionItemIndex}
        setAccordionItemIndex={setAccordionItemIndex}
        targetFeatures={targetFeatures}
      />
      <FeatureImages feature={targetFeature} isReady={item.isReady} />
    </motion.div>
  )
}
