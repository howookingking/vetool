import { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Heart } from 'lucide-react'
import { cn } from '@/lib/utils/utils'

type VitalCountState = {
  beats: number[] // 심박수 측정 시간
  averageBpm: number | null // 평균 심박수
  isActive: boolean // 측정 중인지 여부
  isPressed: boolean // 하트를 누르고 있는지 여부
}

export default function VitalCounter() {
  const [state, setState] = useState<VitalCountState>({
    beats: [],
    averageBpm: null,
    isActive: false,
    isPressed: false,
  })

  // ms 단위로 시간 저장
  const handleHeartClick = () => {
    setState((prev) => {
      if (prev.isActive) {
        return {
          ...prev,
          beats: [...prev.beats, Date.now()],
        }
      } else {
        return {
          ...prev,
          isActive: true,
          beats: [],
          averageBpm: null,
        }
      }
    })
  }

  const handleMouseDown = () => {
    setState((prev) => ({ ...prev, isPressed: true }))
  }

  const handleMouseUp = () => {
    setState((prev) => ({ ...prev, isPressed: false }))
    handleHeartClick()
  }

  useEffect(() => {
    const beatsLength = state.beats.length

    if (beatsLength >= 2) {
      // 마지막 측정 시간 - 첫 번째 측정 시간
      const totalTime = state.beats[beatsLength - 1] - state.beats[0]
      // 측정 횟수
      const beatsCount = beatsLength - 1
      // 평균 심박수
      const avgBpm = Math.round((beatsCount * 60000) / totalTime)

      setState((prev) => ({ ...prev, averageBpm: avgBpm }))
    }

    // 5초 후 측정 중지 타임아웃
    const timeout = setTimeout(() => {
      if (
        state.beats.length > 0 &&
        Date.now() - state.beats[state.beats.length - 1] > 5000
      ) {
        setState((prev) => ({ ...prev, isActive: false }))
      }
    }, 5000)

    return () => clearTimeout(timeout)
  }, [state.beats])

  return (
    <Card className="flex h-full w-full items-center justify-center rounded-2xl bg-white p-6 shadow-lg">
      <CardContent className="flex select-none flex-col items-center">
        <Heart
          className={cn(
            'h-72 w-72 cursor-pointer transition-all duration-200',
            state.isPressed ? 'scale-100' : 'scale-105',
          )}
          fill="#e15745"
          stroke="#e15745"
          strokeWidth={1}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
        />
        <span className="mt-2 text-xl font-bold">심박수, 호흡수 측정</span>

        <div className="flex h-32 flex-col items-center justify-center">
          {!state.isActive && state.beats.length === 0 ? (
            <span className="text-md text-muted-foreground sm:text-lg">
              하트를 눌러서 측정을 시작하세요
            </span>
          ) : (
            <div className="flex flex-col items-center">
              <span className="text-lg text-gray-600">
                {state.isActive ? '측정 중...' : '측정 완료'}
              </span>

              <div className="flex h-12 items-center justify-center">
                {state.averageBpm && (
                  <span className="text-2xl font-bold text-primary sm:text-4xl">
                    {state.averageBpm} 회/분
                  </span>
                )}
              </div>

              <div className="flex h-6 items-center justify-center">
                {state.beats.length >= 0 && (
                  <span className="text-sm text-gray-500">
                    측정 횟수: {state.beats.length + 1}회
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
