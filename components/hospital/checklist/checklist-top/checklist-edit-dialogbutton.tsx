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
import CustomTooltip from '@/components/ui/custom-tooltip'
import { cn } from '@/lib/utils/utils'
import { Separator } from '@/components/ui/separator'
import { Pencil, FileCheck, ScrollText, Monitor, Trash2 } from 'lucide-react'
import { useParams, usePathname, useRouter } from 'next/navigation'
import React, { useState, useEffect } from 'react'
import { getPatientChecklistData } from '@/lib/services/checklist/get-checklist-data'
import type {
  ChecklistSidebarData,
  ChecklistPatinet,
} from '@/types/checklist/checklistchart'
import TxEditContainer from '../edit/txchart-edit-container'

const ChecklistEditDialogButton = ({ isEdit }: { isEdit: boolean }) => {
  const [isChecklistEditDialogOpen, setChecklistEditDialogOpen] =
    useState(false)
  const [prechecklistData, setPreChecklistData] =
    useState<ChecklistSidebarData | null>()

  const { push } = useRouter()
  const pathname = usePathname()
  useEffect(() => {
    fetchData()
    setChecklistEditDialogOpen(isEdit)
  }, [isEdit])
  const isActive = pathname.split('/')[7]
  const fetchData = async () => {
    const checklistData: ChecklistSidebarData | null =
      await getPatientChecklistData(pathname.split('/')[6])

    setPreChecklistData(checklistData)
  }

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
      onOpenChange={checklistEditDialogOpen}
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
            {prechecklistData && prechecklistData.checklist_type
              ? '치료 차트 수정'
              : '치료 차트 등록'}
          </DialogTitle>
          <DialogDescription>
            {prechecklistData && prechecklistData.checklist_type
              ? '치료 차트를 수정합니다'
              : '치료 차트를 신규등록합니다'}
          </DialogDescription>
        </DialogHeader>
        <TxEditContainer
          pretxdata={prechecklistData ?? null}
          setaChecklistEditDialogOpen={checklistEditDialogOpen}
        ></TxEditContainer>
      </DialogContent>
    </Dialog>
  )
}

export default ChecklistEditDialogButton
