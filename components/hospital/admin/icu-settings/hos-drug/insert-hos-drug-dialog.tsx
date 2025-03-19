'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Plus } from 'lucide-react'
import { useState } from 'react'
import HosDrugForm from './hos-drug-form'

export function InsertHosDrugDialog() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button size="icon" className="h-6 w-6 rounded-full">
          <Plus />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>자주 사용하는 약물 추가</DialogTitle>
          <DialogDescription>
            예시 : AMC(약물명) 12.5mg/kg(기본용량) 0.2ml/kg(체중당 투여량)
            IV(투여경로) 익스텐션(주사시 특이사항)
          </DialogDescription>
        </DialogHeader>

        <HosDrugForm setIsDialogOpen={setIsDialogOpen} />
      </DialogContent>
    </Dialog>
  )
}
