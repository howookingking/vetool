'use client'

import FeatureAccordion from '@/components/company/main/feature/feature-accordion'
import FeatureTitle from '@/components/company/main/feature/feature-title'
import { FEATURES } from '@/constants/company/main'
import { useState } from 'react'
import FeatureImages from './feature-images'

export default function FeatureSection() {
  const [isAccordionOpen, setIsAccordionOpen] = useState(
    FEATURES[0].id.toString(),
  )

  const targetFeature =
    FEATURES.find((feature) => feature.id.toString() === isAccordionOpen) ??
    FEATURES[0]

  return (
    <section
      id="feature"
      className="flex h-screen flex-col items-center justify-center gap-4 px-8 xl:h-company xl:gap-16 xl:py-16"
    >
      <FeatureTitle />

      <div className="grid w-full gap-4 xl:max-w-[1600px] xl:grid-cols-3 xl:gap-16">
        <FeatureAccordion
          isAccordionOpen={isAccordionOpen}
          setIsAccordionOpen={setIsAccordionOpen}
        />

        <FeatureImages feature={targetFeature} />
      </div>
    </section>
  )
}
