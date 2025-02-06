// patient 라우트에서 사용하는 patient-update-dialog가 있을 헷갈림 주의

'use client'

import LargeLoaderCircle from '@/components/common/large-loader-circle'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import PatientDetailInfo from '@/components/hospital/common/patient/patient-detail-info'
import { type PatientDataTable } from '@/types/patients'
import dynamic from 'next/dynamic'
import { useParams } from 'next/navigation'
import { useState } from 'react'

const LazyPatientForm = dynamic(
  () => import('@/components/hospital/patients/patient-form'),
  {
    ssr: false,
    loading: () => <LargeLoaderCircle className="h-[544px]" />,
  },
)

type UpdatePatientDialogProps = {
  patientData: PatientDataTable
  weight: string
  weightMeasuredDate: string | null
  icuChartId: string
}

export default function IcuPatientUpdateDialog({
  patientData,
  weight,
  weightMeasuredDate,
  icuChartId,
}: UpdatePatientDialogProps) {
  const { name, breed, gender, species, birth } = patientData

  const { hos_id } = useParams()

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
            weight={weight}
            weightMeasuredDate={weightMeasuredDate}
          />
        </Button>
      </DialogTrigger>

      <DialogContent className="flex flex-col sm:max-w-[1000px]">
        <DialogHeader>
          <DialogTitle>{name} 정보 수정</DialogTitle>
          <DialogDescription>환자의 정보를 수정합니다</DialogDescription>
        </DialogHeader>

        <LazyPatientForm
          mode="updateFromIcuRoute"
          hosId={hos_id as string}
          editingPatient={patientData}
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
