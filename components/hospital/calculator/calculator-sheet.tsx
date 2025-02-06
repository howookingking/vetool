'use client'

import CalculatorSheetContent from '@/components/hospital/calculator/calculator-sheet-content'
import { Button } from '@/components/ui/button'
import { Sheet, SheetTrigger } from '@/components/ui/sheet'
import useIsMobile from '@/hooks/use-is-mobile'
import { Calculator } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils/utils'

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

      <CalculatorSheetContent isSheetOpen={isSheetOpen} isMobile={isMobile} />
    </Sheet>
  )
}
