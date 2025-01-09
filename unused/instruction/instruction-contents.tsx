import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { INSTRUCTIONS } from '@/constants/hospital/icu/chart/instruction'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import ReactPlayer from 'react-player'

export default function InstructionContents({
  currentVideo,
  setCurrentVideo,
}: {
  setCurrentVideo: Dispatch<
    SetStateAction<{
      menuId: number
      slideId: number
    }>
  >
  currentVideo: {
    menuId: number
    slideId: number
  }
}) {
  const [api, setApi] = useState<CarouselApi>()
  // const [current, setCurrent] = useState(0)
  // const [count, setCount] = useState(0)

  useEffect(() => {
    if (!api) {
      return
    }

    // setCount(api.scrollSnapList().length)
    // setCurrent(api.selectedScrollSnap() + 1)
    setCurrentVideo((prev) => ({
      ...prev,
      slideId: api.selectedScrollSnap() + 1,
    }))

    api.on('select', () => {
      // setCurrent(api.selectedScrollSnap() + 1)
      setCurrentVideo((prev) => ({
        ...prev,
        slideId: api.selectedScrollSnap() + 1,
      }))
    })
  }, [api, setCurrentVideo])

  useEffect(() => {
    if (api) {
      api.scrollTo(0, true)
      // setCurrent(1)
    }
  }, [currentVideo.menuId, api])

  const selectedMenu = INSTRUCTIONS[currentVideo.menuId - 1]

  return (
    <Carousel className="w-full" setApi={setApi}>
      <CarouselContent>
        {selectedMenu.slides.map((slide) => {
          return (
            <CarouselItem key={slide.id}>
              <div className="flex h-12 items-center justify-center border-b">
                <div className="relative flex items-center gap-1">
                  <span className="text-base font-semibold">
                    {slide.description}
                  </span>
                </div>
              </div>
              <div className="flex flex-col items-center justify-center">
                <div className="relative w-full">
                  <ReactPlayer
                    url={slide.video}
                    width="100%"
                    height="auto"
                    controls
                    playing={
                      selectedMenu.id === currentVideo.menuId &&
                      currentVideo.slideId === slide.id
                    }
                    stopOnUnmount
                  />
                </div>
              </div>
            </CarouselItem>
          )
        })}
      </CarouselContent>
      <div className="absolute bottom-10 right-10 flex gap-4">
        <CarouselPrevious variant="default" />
        <CarouselNext variant="default" />
      </div>
    </Carousel>
  )
}
