'use client'

import CalculatorSheetContent from '@/components/hospital/calculator/calculator-sheet-content'
import { Button } from '@/components/ui/button'
import { Sheet, SheetTrigger } from '@/components/ui/sheet'
import { Calculator } from 'lucide-react'
import { useState } from 'react'

export default function CalculatorSheet() {
  const [isSheetOpen, setIsSheetOpen] = useState(false)

  return (
    <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
      <SheetTrigger asChild>
        <Button size="icon" className="h-10 w-10 rounded-full">
          <Calculator />
        </Button>
      </SheetTrigger>

      <CalculatorSheetContent isSheetOpen={isSheetOpen} />
    </Sheet>
  )
}
