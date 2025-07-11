'use client'

import PatientFormDynamic from '@/components/common/patients/form/patient-form-dynamic'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { useState } from 'react'

export default function PatientRegisterDialog({ hosId }: { hosId: string }) {
  const [isPatientRegisterDialogOpen, setIsPatientRegisterDialogOpen] =
    useState(false)

  return (
    <Dialog
      open={isPatientRegisterDialogOpen}
      onOpenChange={setIsPatientRegisterDialogOpen}
    >
      <DialogTrigger asChild>
        <Button size="sm">환자 등록</Button>
      </DialogTrigger>

      <DialogContent
        className="flex flex-col sm:max-w-[1200px]"
        onInteractOutside={(e) => {
          e.preventDefault()
        }}
      >
        <DialogHeader>
          <DialogTitle>환자등록</DialogTitle>
          <DialogDescription>신규 환자를 등록합니다</DialogDescription>
        </DialogHeader>

        <PatientFormDynamic
          mode="registerFromPatientRoute"
          hosId={hosId}
          setIsPatientRegisterDialogOpen={setIsPatientRegisterDialogOpen}
          registeringPatient={null}
          setRegisteringPatient={null}
          debouncedSearch={null}
        />
      </DialogContent>
    </Dialog>
  )
}
