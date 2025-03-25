'use client'

import Image from 'next/image'
import { motion } from 'motion/react'

export default function StatsMockupImage() {
  return (
    <motion.figure
      initial={{ opacity: 0, scale: 1, x: -150 }}
      whileInView={{ opacity: 1, scale: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1 }}
      className="relative -ml-10 h-full w-full sm:h-1/2 md:w-2/3 lg:-ml-80 lg:w-4/5 xl:h-full"
    >
      <Image
        src="/company/responsive-image.png"
        alt="faqs"
        fill
        className="scale-100 object-contain md:scale-150 xl:scale-100"
      />
    </motion.figure>
  )
}
