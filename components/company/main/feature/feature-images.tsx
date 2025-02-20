import { FEATURES } from '@/constants/company/main'
import Image from 'next/image'

type Props = {
  feature: (typeof FEATURES)[number]
}

export default function FeatureImages({ feature }: Props) {
  return (
    <div className="order-1 flex items-center justify-center xl:order-2 xl:col-span-2">
      <div className="relative aspect-video h-full w-full">
        <Image
          src={feature.imgSrc}
          alt={feature.title}
          fill
          className="object-contain"
          priority
        />
      </div>
    </div>
  )
}
