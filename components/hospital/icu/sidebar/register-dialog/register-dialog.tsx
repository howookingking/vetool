'use client'

import PatientFormDynamic from '@/components/common/patients/form/patient-form-dynamic'
import SearchPatientContainer from '@/components/common/patients/search/search-patient-containter'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/lib/utils/utils'
import { PlusIcon } from 'lucide-react'
import { useState } from 'react'

type Props = {
  hosId: string
  targetDate: string
  // chartCount: number
}

export default function RegisterDialog({
  hosId,
  targetDate,
  // chartCount,
}: Props) {
  const [isIcuRegisterDialogOpen, setIsIcuRegisterDialogOpen] = useState(false)

  // # 요금제 일단 비활성화
  // const isAvailableAddChart = canAddChart(plan // basicHos에 있음, chartCount)

  return (
    <Dialog
      open={isIcuRegisterDialogOpen}
      onOpenChange={setIsIcuRegisterDialogOpen}
    >
      <DialogTrigger asChild className="hidden md:flex">
        <Button size="sm" className="shrink-0 pr-4 text-sm">
          <PlusIcon />
          입원
        </Button>
      </DialogTrigger>

      <DialogContent
        className={cn('flex flex-col sm:max-w-[1200px]')}
        onInteractOutside={(e) => {
          e.preventDefault()
        }}
      >
        <DialogHeader>
          <DialogTitle>입원</DialogTitle>
          <DialogDescription>{targetDate}에 입원합니다</DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="search">
          <TabsList className="mb-2 w-full">
            <TabsTrigger value="search" className="w-full">
              기존 환자
            </TabsTrigger>

            <TabsTrigger value="register" className="w-full">
              신규 환자
            </TabsTrigger>
          </TabsList>

          <TabsContent value="search">
            <SearchPatientContainer
              hosId={hosId}
              isIcu
              setIsIcuRegisterDialogOpen={setIsIcuRegisterDialogOpen}
            />
          </TabsContent>

          <TabsContent value="register">
            <PatientFormDynamic
              mode="registerFromIcuRoute"
              hosId={hosId}
              setIsPatientRegisterDialogOpen={setIsIcuRegisterDialogOpen}
              debouncedSearch={null}
            />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
