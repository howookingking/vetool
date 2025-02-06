'use client'

import { Button } from '@/components/ui/button'
import { Sheet, SheetTrigger } from '@/components/ui/sheet'
import useIsMobile from '@/hooks/use-is-mobile'
import { cn } from '@/lib/utils/utils'
import { Calculator } from 'lucide-react'
import dynamic from 'next/dynamic'
import { useState } from 'react'

const LazyCalculatorSheetContent = dynamic(
  () => import('@/components/hospital/calculator/calculator-sheet-content'),
  {
    ssr: false,
  },
)

export default function CalculatorSheet() {
  const isMobile = useIsMobile()

  const [isSheetOpen, setIsSheetOpen] = useState(false)

  return (
    <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
      <SheetTrigger className={cn(isMobile && 'm-1')} asChild>
        <Button size="icon" className="h-10 w-10 rounded-full">
          <Calculator />
        </Button>
      </SheetTrigger>

      <LazyCalculatorSheetContent
        isSheetOpen={isSheetOpen}
        isMobile={isMobile}
      />
    </Sheet>
  )
}
