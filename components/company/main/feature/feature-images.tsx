import { cn } from '@/lib/utils/utils'
import type { Features } from '@/types/company/company'
import Image from 'next/image'

type Props = {
  feature: Features
  isReady: boolean
}

export default function FeatureImages({ feature, isReady }: Props) {
  return (
    <>
      <Image
        src={feature.imgSrc}
        alt={feature.title}
        className={cn(
          isReady ? '' : 'blur-[1px]',
          'aspect-video object-contain',
        )}
        priority
        quality={60}
      />

      {!isReady && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="rounded bg-gray-800/80 px-4 py-2 text-white">
            곧 공개될 예정입니다
          </div>
        </div>
      )}
    </>
  )
}
