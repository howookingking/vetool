'use client'

import NoResultSquirrel from '@/components/common/no-result-squirrel'
import useIsMobile from '@/hooks/use-is-mobile'

export default function ChartDefaultPage() {
  const isMobile = useIsMobile()
  return (
    <NoResultSquirrel
      text={isMobile ? '👆 환자를 선택해주세요' : '👈 환자를 선택해주세요'}
      className="h-icu-chart-main flex-col"
      size="lg"
    />
  )
}
