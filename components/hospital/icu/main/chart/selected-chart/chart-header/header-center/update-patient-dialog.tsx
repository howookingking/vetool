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
import { convertPascalCased, getAgeFromAgeInDays } from '@/lib/utils/utils'
import type { PatientDataTable } from '@/types/patients'
import { Cat, Dog } from 'lucide-react'
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

export default function UpdatePatientDialog({
  patientData,
  ageInDays,
  weight,
  weightMeasuredDate,
  icuChartId,
}: {
  patientData: PatientDataTable
  ageInDays: number
  weight: string
  weightMeasuredDate: string | null
  icuChartId: string
}) {
  const { hos_id } = useParams()
  const { name, breed, gender, species } = patientData
  const [isPatientUpdateDialogOpen, setIsPatientUpdateDialogOpen] =
    useState(false)

  return (
    <Dialog
      open={isPatientUpdateDialogOpen}
      onOpenChange={setIsPatientUpdateDialogOpen}
    >
      <DialogTrigger asChild>
        <Button variant="ghost" className="flex gap-2">
          {species === 'canine' ? <Dog size={20} /> : <Cat size={20} />}
          <span>{name}</span> ·<span>{convertPascalCased(breed)}</span> ·
          <span className="uppercase">{gender}</span> ·
          <span>{getAgeFromAgeInDays(ageInDays)} </span>
          <span>·</span>
          <span>
            {weight === '' ? '체중 입력' : `${weight}kg`}
            <span className="hidden md:inline">
              {weightMeasuredDate ? `(${weightMeasuredDate})` : ''}
            </span>
          </span>
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
          setIsPatientUpdateDialogOpen={setIsPatientUpdateDialogOpen}
          weight={weight}
          weightMeasuredDate={weightMeasuredDate}
          icuChartId={icuChartId}
        />
      </DialogContent>
    </Dialog>
  )
}
