import LargeLoaderCircle from '@/components/common/large-loader-circle'
import NoResultSquirrel from '@/components/common/no-result-squirrel'
import TxImage from '@/components/hospital/icu/main/chart/selected-chart/chart-body/table/tx/detail-insert-step/images/view/tx-image'
import { Button } from '@/components/ui/button'
import type { ImageUrlResponse } from '@/types/images'
import useEmblaCarousel from 'embla-carousel-react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useState, useEffect } from 'react'

type TxImageViewCarouselProps = {
  isLoading: boolean
  initialSlide?: number
  bucketImages: ImageUrlResponse[]
  tempImages?: File[]
}

/**
 * 저장된 이미지 뷰 캐러셀
 */
export default function TxImageViewCarousel({
  isLoading,
  initialSlide,
  bucketImages,
  tempImages,
}: TxImageViewCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(initialSlide || 0)
  const [emblaRef, emblaApi] = useEmblaCarousel({
    startIndex: initialSlide,
  })

  const totalSlides = (bucketImages?.length || 0) + (tempImages?.length || 0)

  useEffect(() => {
    if (!emblaApi) return

    emblaApi.on('select', () => {
      setCurrentSlide(emblaApi.selectedScrollSnap())
    })
  }, [emblaApi])

  const scrollPrev = () => {
    if (emblaApi) emblaApi.scrollPrev()
  }

  const scrollNext = () => {
    if (emblaApi) emblaApi.scrollNext()
  }

  const hasImages =
    (bucketImages && bucketImages.length > 0) ||
    (tempImages && tempImages.length > 0)

  if (!hasImages)
    return (
      <NoResultSquirrel text="이미지가 존재하지 않습니다" className="h-full" />
    )

  return (
    <div className="relative" role="region" aria-label="이미지 캐러셀">
      <div className="overflow-hidden" ref={emblaRef}>
        <ul className="flex" role="list">
          {bucketImages?.map((image, index) => (
            <li
              key={image.url}
              className="min-w-0 flex-[0_0_100%] px-6"
              role="listitem"
            >
              <div className="relative h-[80vh] w-full">
                <TxImage
                  url={image.url}
                  contentType={image.contentType}
                  index={index}
                  className="object-contain"
                  control
                />
              </div>
            </li>
          ))}

          {tempImages?.map((image, index) => (
            <li key={index} className="min-w-0 flex-[0_0_100%]" role="listitem">
              <div className="relative h-[80vh] w-full">
                <TxImage
                  url={URL.createObjectURL(image)}
                  contentType={image.type}
                  index={index + (bucketImages?.length || 0)}
                  className="object-contain"
                  control
                />
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/50 px-4 py-2 text-sm text-white">
        {currentSlide + 1} / {totalSlides}
      </div>

      <Button
        variant="ghost"
        className="absolute -left-6 top-1/2 -translate-y-1/2"
        onClick={scrollPrev}
        aria-label="이전 이미지"
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>

      <Button
        variant="ghost"
        className="absolute -right-6 top-1/2 -translate-y-1/2"
        onClick={scrollNext}
        aria-label="다음 이미지"
      >
        <ChevronRight className="h-6 w-6" />
      </Button>
    </div>
  )
}
