'use client'

import { Button } from '@/components/ui/button'
import { Undo2Icon } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function OutPatientCover() {
  const [opacity, setOpacity] = useState(1)

  useEffect(() => {
    const fadeOutTimer = setTimeout(() => {
      setOpacity(0)
    }, 2000)

    return () => {
      clearTimeout(fadeOutTimer)
    }
  }, [])

  return (
    <div className="absolute inset-0 z-20 flex h-full cursor-not-allowed justify-center">
      <div
        className="fixed top-1/2 flex translate-y-[-50%] flex-col gap-1 rounded-sm bg-black/30 px-10 py-5 text-center text-white transition-opacity duration-500"
        style={{ opacity: opacity }}
      >
        <span className="text-xl font-bold">퇴원한 환자입니다</span>
        <div className="flex items-center gap-1">
          수정하려면 우측 상단 버튼
          <Button
            variant="outline"
            className="cursor-not-allowed bg-transparent hover:bg-transparent hover:text-inherit"
            size="icon"
          >
            <Undo2Icon />
          </Button>
          을 눌러주세요
        </div>
      </div>
    </div>
  )
}
