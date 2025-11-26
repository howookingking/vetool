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
import { HOS_SIDEBAR_MENUS } from '@/constants/hospital/hos-sidebar-menus'
import { AnimatePresence, motion } from 'motion/react'
import { useState } from 'react'
import Section from '../section'
import MaxWidthContainer from '@/components/common/max-width-container'

export default function Feature() {
  const [activeTab, setActiveTab] = useState('icu')
  const [accordionItemIndex, setAccordionItemIndex] = useState(
    ICU_FEATURES[0].id.toString(),
  )

  const FEATURE_LIST = HOS_SIDEBAR_MENUS.slice(2, 6)
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
    <Section isEven id="feature">
      <MaxWidthContainer>
        <div className="flex h-full flex-col items-center justify-center gap-4">
          <FeatureTitle />

          <div className="grid w-full xl:max-w-[1400px]">
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
        </div>
      </MaxWidthContainer>
    </Section>
  )
}
