// patient 라우트에서 사용하는 patient-update-dialog가 있을 헷갈림 주의

'use client'

import PatientFormDynamic from '@/components/common/patients/form/patient-form-dynamic'
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
import type { SelectedIcuChart } from '@/types/icu/chart'
import { useState } from 'react'

type Props = {
  patient: SelectedIcuChart['patient']
  weight: SelectedIcuChart['weight']
  weightMeasuredDate: SelectedIcuChart['weight_measured_date']
  icuChartId: SelectedIcuChart['icu_chart_id']
  hosId: string
}

export default function IcuPatientUpdateDialog({
  patient,
  weight,
  weightMeasuredDate,
  icuChartId,
  hosId,
}: Props) {
  const { name, breed, gender, species, birth, is_alive } = patient

  const [isDialogOpen, setIsDialogOpen] = useState(false)

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button
          size="default"
          variant="ghost"
          className="text-xs font-semibold md:text-sm 2xl:text-base"
        >
          <PatientDetailInfo
            species={species}
            name={name}
            breed={breed}
            gender={gender}
            birth={birth}
            weight={weight}
            weightMeasuredDate={weightMeasuredDate}
            isAlive={is_alive}
          />
        </Button>
      </DialogTrigger>

      <DialogContent className="flex flex-col sm:max-w-[1000px]">
        <DialogHeader>
          <DialogTitle>{name} 정보 수정</DialogTitle>
          <DialogDescription>환자의 정보를 수정합니다</DialogDescription>
        </DialogHeader>

        <PatientFormDynamic
          debouncedSearch={null}
          mode="updateFromIcuRoute"
          hosId={hosId}
          editingPatient={patient}
          setIsPatientUpdateDialogOpen={setIsDialogOpen}
          weight={weight}
          weightMeasuredDate={weightMeasuredDate}
          icuChartId={icuChartId}
          registeringPatient={null}
          setRegisteringPatient={null}
        />
      </DialogContent>
    </Dialog>
  )
}
