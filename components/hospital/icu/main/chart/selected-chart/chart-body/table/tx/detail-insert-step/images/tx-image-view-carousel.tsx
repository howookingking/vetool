import { Button } from '@/components/ui/button'
import useEmblaCarousel from 'embla-carousel-react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import NoResultSquirrel from '@/components/common/no-result-squirrel'
import LargeLoaderCircle from '@/components/common/large-loader-circle'
import type { ImageUrlResponse } from '@/types/images'
import { isVideoFile } from '@/lib/utils/utils'

export default function TxImageViewCarousel({
  imageUrls,
  isLoading,
}: {
  imageUrls: ImageUrlResponse[]
  isLoading: boolean
}) {
  const [emblaRef, emblaApi] = useEmblaCarousel()

  const scrollPrev = () => {
    if (emblaApi) emblaApi.scrollPrev()
  }

  const scrollNext = () => {
    if (emblaApi) emblaApi.scrollNext()
  }

  if (isLoading) return <LargeLoaderCircle className="h-full" />

  if (!imageUrls || imageUrls.length === 0)
    return (
      <NoResultSquirrel text="이미지가 존재하지 않습니다" className="h-full" />
    )

  return (
    <div className="relative">
      <div className="overflow-hidden" ref={emblaRef}>
        <ul className="flex">
          {imageUrls.map((image, index) => (
            <li key={image.key} className="min-w-0 flex-[0_0_100%]">
              <div className="relative h-[500px] w-full">
                {isVideoFile(image.key) ? (
                  <video
                    src={image.url}
                    controls
                    className="h-full w-full object-contain"
                  >
                    <source src={image.url} />
                    비디오를 재생할 수 없습니다.
                  </video>
                ) : (
                  <Image
                    src={image.url}
                    alt={`처치 이미지 ${index + 1}`}
                    fill
                    className="object-contain"
                    unoptimized
                  />
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>

      <Button
        variant="ghost"
        className="absolute left-2 top-1/2 -translate-y-1/2"
        onClick={scrollPrev}
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>

      <Button
        variant="ghost"
        className="absolute right-2 top-1/2 -translate-y-1/2"
        onClick={scrollNext}
      >
        <ChevronRight className="h-6 w-6" />
      </Button>
    </div>
  )
}
