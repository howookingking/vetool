import { RegisteringPatient } from '@/components/hospital/checklist/sidebar/checklist-register-dialog/checklist-register-dialog'
import { Button } from '@/components/ui/button'
import { getDaysSince } from '@/lib/utils/utils'
import { CheckIcon } from 'lucide-react'
import type { Dispatch, SetStateAction } from 'react'

type Props = {
  patientId: string
  birth: string
  patientName: string
  hosPatientId: string
  species: string
  breed: string
  gender: string
  setIsConfirmDialogOpen: Dispatch<SetStateAction<boolean>>
  setRegisteringPatient: Dispatch<SetStateAction<RegisteringPatient | null>>
}

export default function NonIcuRegisterButton({
  patientId,
  birth,
  patientName,
  hosPatientId,
  species,
  breed,
  gender,
  setIsConfirmDialogOpen,
  setRegisteringPatient,
}: Props) {
  const handlePatientClick = async () => {
    setRegisteringPatient!({
      patientId,
      birth,
      patientName,
      species,
      breed,
      gender,
      ageInDays: getDaysSince(birth),
      hosPatientId,
    })

    setIsConfirmDialogOpen(true)
  }

  return (
    <Button
      type="button"
      size="icon"
      variant="ghost"
      onClick={handlePatientClick}
    >
      <CheckIcon />
    </Button>
  )
}
