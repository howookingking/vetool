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
import { Pencil, FileCheck, ScrollText, Monitor } from 'lucide-react'
import { useParams, usePathname, useRouter } from 'next/navigation'
import React, { useState, useEffect } from 'react'
import { getPatientChecklistData } from '@/lib/services/checklist/get-checklist-data'
import type {
  ChecklistSidebarData,
  ChecklistPatinet,
} from '@/types/checklist/checklistchart'

const ChecklistEditDialogButton = () => {
  const [isChecklistEditDialogOpen, setChecklistEditDialogOpen] =
    useState(false)
  const [prechecklistData, setPreChecklistData] =
    useState<ChecklistSidebarData | null>()

  const { push } = useRouter()
  const pathname = usePathname()
  useEffect(() => {
    const fetchData = async () => {
      const checklistData: ChecklistSidebarData = await getPatientChecklistData(
        pathname.split('/')[6],
      )

      setPreChecklistData(checklistData) // ✅ 실제 데이터만 넘김
    }

    fetchData()
  }, [])
  const isActive = pathname.split('/')[7]

  return (
    <Dialog
      open={isChecklistEditDialogOpen}
      onOpenChange={setChecklistEditDialogOpen}
    >
      <DialogTrigger asChild>
        <Button
          type="button"
          variant="outline"
          className={cn('m-2', isActive === 'edit' && 'bg-primary text-white')}
        >
          <Pencil />
          {/* <div className="hidden 2xl:flex">EDIT</div> */}
        </Button>
      </DialogTrigger>
      <DialogContent
        className="flex flex-col sm:max-w-[1200px]"
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
        <div>{prechecklistData?.patients.name}</div>
        <Button
          onClick={(e) => {
            setChecklistEditDialogOpen(false)
          }}
          type="button"
        >
          <div>
            {' '}
            {prechecklistData && prechecklistData.checklist_type
              ? '수정'
              : '등록'}
          </div>
        </Button>
      </DialogContent>
    </Dialog>
  )
}

export default ChecklistEditDialogButton
