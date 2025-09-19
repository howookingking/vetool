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
import { cn } from '@/lib/utils/utils'
import { ChecklistData } from '@/types/checklist/checklist-type'
import { Pencil } from 'lucide-react'
import { useState } from 'react'
import ChecklistEditContainer from '../checklist-edit/checklist-edit-container'
import { ChecklistWithPatientWithWeight } from '@/lib/services/checklist/checklist-data'

type Props = {
  isEdit: boolean
  checklistData: ChecklistWithPatientWithWeight
}

export default function ChecklistEditDialogButton({
  isEdit,
  checklistData,
}: Props) {
  const [isChecklistEditDialogOpen, setChecklistEditDialogOpen] =
    useState(false)

  return (
    <Dialog
      open={isChecklistEditDialogOpen}
      onOpenChange={setChecklistEditDialogOpen}
    >
      <DialogTrigger asChild>
        <Button
          size="icon"
          variant="ghost"
          className={cn(isChecklistEditDialogOpen && 'bg-primary text-white')}
        >
          <Pencil />
          {/* <div className="hidden 2xl:flex">EDIT</div> */}
        </Button>
      </DialogTrigger>
      <DialogContent
        className="flex max-h-screen flex-col overflow-y-auto sm:max-w-[1200px]"
        onInteractOutside={(e) => {
          e.preventDefault()
        }}
      >
        <DialogHeader>
          <DialogTitle>
            {checklistData && checklistData.checklist_type
              ? '체크리스트 수정'
              : '체크리스트 등록'}
          </DialogTitle>
          <DialogDescription>
            {checklistData && checklistData.checklist_type
              ? '체크리스트를 수정합니다'
              : '체크리스트를 신규등록합니다'}
          </DialogDescription>
        </DialogHeader>
        {/* {checklistData && (
          <ChecklistEditContainer
            checklistId={checklistId}
            checklistData={checklistData}
            setChecklistEditDialogOpen={checklistEditDialogOpen}
          />
        )} */}
      </DialogContent>
    </Dialog>
  )
}
