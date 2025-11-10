import { Button } from '@/components/ui/button'
import { SheetDescription, SheetTitle } from '@/components/ui/sheet'
import { cn } from '@/lib/utils/utils'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import { Heart, RotateCw } from 'lucide-react'
import { useEffect, useState } from 'react'

type VitalCountState = {
  beats: number[] // 심박수 측정 시간
  averageBpm: number | null // 평균 심박수
  isActive: boolean // 측정 중인지 여부
  isPressed: boolean // 하트를 누르고 있는지 여부
}

const INITIAL_STATE: VitalCountState = {
  beats: [],
  averageBpm: null,
  isActive: false,
  isPressed: false,
}

const MILLISECONDS_PER_MINUTE = 60000
const MINIMUM_BEATS_FOR_CALCULATION = 2

export default function VitalCounter() {
  const [vitalCountState, setVitalCountState] =
    useState<VitalCountState>(INITIAL_STATE)

  // ms 단위로 시간 저장
  const handleHeartClick = () => {
    setVitalCountState((prev) =>
      prev.isActive
        ? {
            ...prev,
            beats: [...prev.beats, Date.now()],
          }
        : {
            ...prev,
            isActive: true,
            beats: [],
            averageBpm: null,
          },
    )
  }

  const handlePressStart = (e: React.PointerEvent<SVGSVGElement>) => {
    e.preventDefault()
    setVitalCountState((prev) => ({ ...prev, isPressed: true }))
  }

  const handlePressEnd = (e: React.PointerEvent<SVGSVGElement>) => {
    e.preventDefault()
    setVitalCountState((prev) => ({ ...prev, isPressed: false }))
    handleHeartClick()
  }

  useEffect(() => {
    const beatsLength = vitalCountState.beats.length

    if (beatsLength >= MINIMUM_BEATS_FOR_CALCULATION) {
      // 마지막 측정 시간 - 첫 번째 측정 시간
      const totalTime =
        vitalCountState.beats[beatsLength - 1] - vitalCountState.beats[0]
      // 측정 횟수
      const beatsCount = beatsLength - 1
      // 평균 심박수
      const avgBpm = Math.round(
        (beatsCount * MILLISECONDS_PER_MINUTE) / totalTime,
      )

      setTimeout(
        () => setVitalCountState((prev) => ({ ...prev, averageBpm: avgBpm })),
        0,
      )
    }
  }, [vitalCountState.beats])

  return (
    <>
      <VisuallyHidden>
        <SheetTitle />
        <SheetDescription />
      </VisuallyHidden>

      <div className="flex h-full items-center justify-center">
        <div className="relative flex select-none flex-col items-center">
          <Heart
            className={cn(
              'h-72 w-72 cursor-pointer transition-all duration-200',
              vitalCountState.isPressed ? 'scale-95' : 'scale-100',
            )}
            fill="#e15745"
            stroke="#e15745"
            strokeWidth={1}
            onPointerDown={handlePressStart}
            onPointerUp={handlePressEnd}
          />
          <span className="mt-2 text-xl font-bold">심박수, 호흡수 측정</span>

          <div className="flex h-32 flex-col items-center justify-center">
            {!vitalCountState.isActive && vitalCountState.beats.length === 0 ? (
              <span className="text-md text-muted-foreground sm:text-lg">
                하트를 눌러서 측정을 시작하세요
              </span>
            ) : (
              <div className="flex flex-col items-center">
                <span className="text-lg text-gray-600">
                  {vitalCountState.isActive ? '측정 중...' : '측정 완료'}
                </span>

                <div className="flex h-12 items-center justify-center">
                  {vitalCountState.averageBpm && (
                    <span className="text-2xl font-bold text-primary sm:text-4xl">
                      {vitalCountState.averageBpm} 회/분
                    </span>
                  )}
                </div>

                <div className="flex h-6 items-center justify-center">
                  {vitalCountState.beats.length >= 0 && (
                    <span className="text-sm text-gray-500">
                      측정 횟수: {vitalCountState.beats.length + 1}회
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>

          {vitalCountState.isActive && (
            <Button
              variant={'outline'}
              onClick={() => {
                setVitalCountState(INITIAL_STATE)
              }}
              size="icon"
              className="absolute right-0 top-0"
            >
              <RotateCw />
            </Button>
          )}
        </div>
      </div>
    </>
  )
}
