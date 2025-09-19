'use client'

import PatientDetailInfo from '@/components/hospital/common/patient/patient-detail-info'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import type { ChecklistWithPatientWithWeight } from '@/lib/services/checklist/checklist-data'
import { useState } from 'react'
import ClPatientRegisterForm from '../sidebar/checklist-register-dialog/cl-patient-register-form'

type Props = {
  hosId: string
  targetDate: string
  checklistData: ChecklistWithPatientWithWeight
}

export default function ClPatientUpdateDialog({
  hosId,
  targetDate,
  checklistData,
}: Props) {
  const {
    species,
    name,
    breed,
    gender,
    birth,
    body_weight,
    is_alive,
    weight_measured_date,
  } = checklistData.patient

  const [isDialogOpen, setIsDialogOpen] = useState(false)

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="text-xs font-semibold md:text-sm 2xl:text-base"
        >
          <PatientDetailInfo
            species={species}
            name={name}
            breed={breed}
            gender={gender}
            birth={birth}
            weight={body_weight}
            weightMeasuredDate={weight_measured_date}
            isAlive={is_alive}
          />
        </Button>
      </DialogTrigger>

      <DialogContent className="flex flex-col sm:max-w-[1000px]">
        <DialogHeader>
          <DialogTitle>{name} 정보 수정</DialogTitle>
          <DialogDescription>환자의 정보를 수정합니다</DialogDescription>
        </DialogHeader>

        <ClPatientRegisterForm
          patient={checklistData.patient}
          hosId={hosId}
          targetDate={targetDate}
          setIsDialogOpen={setIsDialogOpen}
          isEdit
        />
      </DialogContent>
    </Dialog>
  )
}
