'use client'

import { useEffect, useState } from 'react'

export default function OutPatientCover() {
  const [opacity, setOpacity] = useState(1)

  useEffect(() => {
    setOpacity(1)
    const fadeOutTimer = setTimeout(() => {
      setOpacity(0)
    }, 2000)
    return () => {
      clearTimeout(fadeOutTimer)
    }
  }, [])

  return (
    <div className="absolute left-0 right-0 top-0 z-20 flex h-full cursor-not-allowed justify-center">
      <div
        className="fixed top-1/2 flex translate-y-[-50%] flex-col gap-1 rounded-sm bg-black/30 px-10 py-5 text-center text-white transition-opacity duration-500"
        style={{ opacity }}
      >
        <span className="text-xl font-bold">퇴원한 환자입니다</span>
        <span>수정하려면 퇴원을 취소해주세요</span>
      </div>
    </div>
  )
}
