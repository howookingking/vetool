import { type Features } from '@/types/company/company'
import Image from 'next/image'

type Props = {
  feature: Features
  isReady: boolean
}

export default function FeatureImages({ feature, isReady }: Props) {
  return (
    <div className="order-1 flex items-center justify-center lg:order-2 lg:col-span-2">
      <div className="relative aspect-video h-full w-full">
        <Image
          src={feature.imgSrc}
          alt={feature.title}
          fill
          className={`object-contain ${!isReady ? 'blur-[2px]' : ''}`}
          priority
        />
        {!isReady && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="rounded bg-gray-800/80 px-4 py-2 text-white">
              곧 공개될 예정입니다
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
