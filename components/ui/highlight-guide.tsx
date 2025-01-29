'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Indicator } from '@/components/ui/indicator'
import useLocalStorage from '@/hooks/use-local-storage'
import { useEffect, useState } from 'react'

const HIGHLIGHT_CLASS_NAMES = ['z-max', 'bg-white', 'ring-4', 'ring-primary']

export type GuideStep = {
  target: string
  title: string
  description: string
}

type HighlightGuideProps = {
  steps: GuideStep[]
  localStorageKey: string
}

export default function HighlightGuide({
  steps,
  localStorageKey,
}: HighlightGuideProps) {
  const [_, setHasVisited] = useLocalStorage(localStorageKey, false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)

  useEffect(() => {
    const visited = localStorage.getItem(localStorageKey) === 'true'
    if (!visited) {
      const firstTarget = document.querySelector(
        `[data-guide="${steps[currentStep].target}"]`,
      )
      firstTarget?.classList.add(...HIGHLIGHT_CLASS_NAMES)
      setIsDialogOpen(true)
    }
  }, [localStorageKey, steps, currentStep])

  const removeAllHighlights = () => {
    document.querySelectorAll('[data-guide]').forEach((element) => {
      element.classList.remove(...HIGHLIGHT_CLASS_NAMES)
    })
  }

  const highlightTarget = (step: number) => {
    removeAllHighlights()

    // 현재 타겟 하이라이트
    const currentTarget = document.querySelector(
      `[data-guide="${steps[step].target}"]`,
    )
    if (currentTarget) {
      currentTarget.classList.add(...HIGHLIGHT_CLASS_NAMES)
    }
  }

  // useEffect(() => {
  //   if (!isDialogOpen) {
  //     removeAllHighlights()
  //   }
  // }, [isDialogOpen])

  const handleNextStep = () => {
    setCurrentStep((prev) => (prev < steps.length - 1 ? prev + 1 : prev))
    highlightTarget(currentStep + 1)
  }

  const handlePrevStep = () => {
    setCurrentStep((prev) => (prev > 0 ? prev - 1 : prev))
    highlightTarget(currentStep - 1)
  }

  const handleCompleteGuide = () => {
    setIsDialogOpen(false)
    setHasVisited(true)
    removeAllHighlights()
  }

  const handleOpenChange = (open: boolean) => {
    if (open) {
      setCurrentStep(0)
      highlightTarget(0)
    } else {
      removeAllHighlights()
    }
    setIsDialogOpen(open)
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{steps[currentStep].title}</DialogTitle>
          <DialogDescription>
            {steps[currentStep].description}
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="flex items-center justify-between">
          <Indicator
            steps={steps.length}
            currentStep={currentStep}
            onStepClick={setCurrentStep}
          />

          <div className="flex gap-2">
            <Button
              onClick={handlePrevStep}
              disabled={currentStep === 0}
              variant="outline"
              size="sm"
            >
              이전
            </Button>

            {currentStep === steps.length - 1 ? (
              <Button onClick={handleCompleteGuide} size="sm">
                완료
              </Button>
            ) : (
              <Button onClick={handleNextStep} variant="outline" size="sm">
                다음
              </Button>
            )}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
