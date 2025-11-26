'use client'

import Image from 'next/image'
import { motion } from 'motion/react'
import responsiveImage from '@/public/company/responsive-image.png'

export default function StatsMockupImage() {
  return (
    <motion.figure
      initial={{ opacity: 0, scale: 1, x: -150 }}
      whileInView={{ opacity: 1, scale: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1 }}
      className="-ml-10 h-full w-full sm:h-1/2 md:w-2/3 lg:-ml-80 lg:w-4/5 xl:h-full"
    >
      <Image
        src={responsiveImage}
        priority
        alt="faqs"
        className="h-full w-full object-contain"
        quality={100}
      />
    </motion.figure>
  )
}
