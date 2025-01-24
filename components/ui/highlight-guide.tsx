'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Indicator } from '@/components/ui/indicator'
import { SHARE_GUIDE_STEPS } from '@/constants/hospital/share'
import useLocalStorage from '@/hooks/use-local-storage'
import { cn } from '@/lib/utils/utils'
import { CircleHelp, X } from 'lucide-react'
import { useEffect, useState, useCallback } from 'react'

type HighlightGuideProps = {
  steps: typeof SHARE_GUIDE_STEPS
  className?: string
}

export default function HighlightGuide({
  steps,
  className,
}: HighlightGuideProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [_, setIsFirstGuide] = useLocalStorage('isFirstGuide', true)

  // highlightTarget 함수를 useCallback으로 감싸기
  const highlightTarget = useCallback(() => {
    // 이전 하이라이트 초기화
    document.querySelectorAll('[data-guide]').forEach((element) => {
      element.classList.remove('relative', 'z-50', 'bg-background')
    })

    // 현재 타겟 하이라이트
    const currentTarget = document.querySelector(
      `[data-guide="${steps[currentStep].target}"]`,
    )
    if (currentTarget) {
      currentTarget.classList.add('relative', 'z-50', 'bg-background')
    }
  }, [currentStep, steps])

  useEffect(() => {
    if (isOpen) {
      highlightTarget()
    }
  }, [isOpen, highlightTarget])

  // 가이드 종료 시 하이라이트 제거
  useEffect(() => {
    if (!isOpen) {
      document.querySelectorAll('[data-guide]').forEach((el) => {
        el.classList.remove('relative', 'z-50', 'bg-background')
      })
    }
  }, [isOpen])

  // 첫 가이드 여부 확인
  useEffect(() => {
    const storedValue = localStorage.getItem('isFirstGuide')
    const hasSeenBefore = storedValue === 'false'

    if (!hasSeenBefore) {
      setIsOpen(true)
      setIsFirstGuide(false)
    }
  }, [setIsFirstGuide])

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        variant="ghost"
        size="icon"
        className={cn('', className)}
      >
        <CircleHelp />
      </Button>

      {isOpen && (
        <div className="fixed inset-0 z-40 transition-opacity">
          <div className="absolute inset-0 bg-black/50" />
          <div className="relative h-full w-full">
            <Card className="absolute bottom-20 left-1/2 w-full max-w-[560px] -translate-x-1/2 transition-all">
              <CardHeader className="flex flex-row items-center justify-between px-6 py-4">
                <span className="text-lg font-bold">
                  {steps[currentStep].title}
                </span>

                <Button
                  onClick={() => setIsOpen(false)}
                  variant="ghost"
                  size="icon"
                >
                  <X />
                </Button>
              </CardHeader>

              <CardContent className="space-y-4">
                <p className="min-h-12 whitespace-pre-line text-muted-foreground">
                  {steps[currentStep].description}
                </p>

                <div className="flex items-center justify-between pt-4">
                  <Indicator
                    steps={steps.length}
                    currentStep={currentStep}
                    onStepClick={(step) => setCurrentStep(step)}
                  />

                  <div className="flex gap-2">
                    <Button
                      onClick={() => {
                        setCurrentStep((prev) => (prev > 0 ? prev - 1 : prev))
                      }}
                      disabled={currentStep === 0}
                      variant="outline"
                      size="sm"
                    >
                      이전
                    </Button>
                    {currentStep === steps.length - 1 ? (
                      <Button onClick={() => setIsOpen(false)} size="sm">
                        완료
                      </Button>
                    ) : (
                      <Button
                        onClick={() => {
                          setCurrentStep((prev) =>
                            prev < steps.length - 1 ? prev + 1 : prev,
                          )
                        }}
                        variant="outline"
                        size="sm"
                      >
                        다음
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </>
  )
}
