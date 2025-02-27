'use client'

import FeatureContent from '@/components/company/main/feature/feature-content'
import FeatureTitle from '@/components/company/main/feature/feature-title'
import SlideTabs from '@/components/company/main/feature/ui/slide-tabs'
import {
  CHECKUP_FEATURES,
  ECHOCARDIO_FEATURES,
  ICU_FEATURES,
  SURGERY_FEATURES,
} from '@/constants/company/main'
import { SIDEBAR_ITEMS } from '@/constants/hospital/sidebar-items'
import { AnimatePresence, motion } from 'motion/react'
import { useState } from 'react'

export default function Feature() {
  const [activeTab, setActiveTab] = useState('icu')
  const [accordionItemIndex, setAccordionItemIndex] = useState(
    ICU_FEATURES[0].id.toString(),
  )

  const FEATURE_LIST = SIDEBAR_ITEMS.slice(2, 6)
  const activeItem = FEATURE_LIST.find((item) => item.path === activeTab)

  const targetFeatures = {
    icu: ICU_FEATURES,
    checkup: CHECKUP_FEATURES,
    echocardio: ECHOCARDIO_FEATURES,
    surgery: SURGERY_FEATURES,
  }[activeTab]

  const targetFeature =
    targetFeatures?.find(
      (feature) => feature.id.toString() === accordionItemIndex,
    ) ?? targetFeatures![0]

  return (
    <section
      id="feature"
      className="flex h-screen flex-col items-center justify-center gap-4 px-8 xl:h-company xl:py-16"
    >
      <div>
        <FeatureTitle />
      </div>

      <div className="grid w-full gap-4 xl:max-w-[1600px]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <SlideTabs
            tabs={FEATURE_LIST}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        </motion.div>

        <div className="mt-8">
          <AnimatePresence mode="wait">
            {activeItem && (
              <FeatureContent
                key={activeItem.path}
                item={activeItem}
                accordionItemIndex={accordionItemIndex}
                setAccordionItemIndex={setAccordionItemIndex}
                targetFeatures={targetFeatures!}
                targetFeature={targetFeature}
              />
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
