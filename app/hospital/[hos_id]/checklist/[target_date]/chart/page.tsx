'use client'

import NoResultSquirrel from '@/components/common/no-result-squirrel'
import useIsMobile from '@/hooks/use-is-mobile'

export default function ChartDefaultPage() {
  const isMobile = useIsMobile()
  return (
    <NoResultSquirrel
      text={
        isMobile
          ? '👆 치료 차트를 생성하거나 선택해주세요'
          : '👈 치료 차트를 생성하거나 선택해주세요'
      }
      className="h-screen flex-col"
      size="lg"
    />
  )
}
