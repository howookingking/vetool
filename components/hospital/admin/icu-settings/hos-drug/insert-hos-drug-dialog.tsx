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
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
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
          <VisuallyHidden>
            <DialogDescription />
          </VisuallyHidden>
        </DialogHeader>

        <HosDrugForm setIsDialogOpen={setIsDialogOpen} />
      </DialogContent>
    </Dialog>
  )
}
