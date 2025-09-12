'use client'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils/utils'
import { Pencil } from 'lucide-react'
import React, { useState, useEffect, useCallback } from 'react'
import { ChecklistData } from '@/types/checklist/checklist-type'
import ChecklistEditContainer from '../checklist-edit/checklist-edit-container'
import {
  getChecklistDataById,
  getChecklistDataByIdChannel,
} from '@/lib/services/checklist/get-checklist-data-client'
import { Checklist } from '@/types'
type Props = {
  isEdit: boolean
  checklistId: string
}
export default function ChecklistEditDialogButton({
  isEdit,
  checklistId,
}: Props) {
  const [isChecklistEditDialogOpen, setChecklistEditDialogOpen] =
    useState(false)
  const [checklistData, setChecklistData] = useState<ChecklistData | null>()

  const fetchData = useCallback(async () => {
    const data: Checklist = await getChecklistDataById(checklistId)
    let predata: ChecklistData = {} as ChecklistData
    if (data) {
      predata = data as ChecklistData
    }
    setChecklistData(predata)
  }, [checklistId])

  useEffect(() => {
    fetchData()
    const channel = getChecklistDataByIdChannel(checklistId, (payload) => {
      let prepayload: ChecklistData = {} as ChecklistData
      if (payload) {
        prepayload = payload as ChecklistData
      }
      setChecklistData(prepayload)
    })
    setChecklistEditDialogOpen(isEdit)
  }, [isEdit, checklistId, fetchData])
  //   const isActive = pathname.split('/')[7]

  const checklistEditDialogOpen = (isopen: boolean) => {
    if (isopen) {
      fetchData()
      setChecklistEditDialogOpen(true)
    } else {
      setChecklistEditDialogOpen(false)
    }
  }
  return (
    <Dialog
      open={isChecklistEditDialogOpen}
      onOpenChange={setChecklistEditDialogOpen}
    >
      <DialogTrigger asChild>
        <Button
          type="button"
          variant="outline"
          className={cn(
            'm-2',
            isChecklistEditDialogOpen && 'bg-primary text-white',
          )}
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
        {checklistData && (
          <ChecklistEditContainer
            checklistId={checklistId}
            checklistData={checklistData}
            setChecklistEditDialogOpen={checklistEditDialogOpen}
          />
        )}
      </DialogContent>
    </Dialog>
  )
}
