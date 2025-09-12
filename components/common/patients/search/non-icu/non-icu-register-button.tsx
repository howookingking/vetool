import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/use-toast'
import { getLatestIoByPatientId } from '@/lib/services/icu/chart/get-icu-io-by-patient-id'
import { getDaysSince } from '@/lib/utils/utils'
import { Check, LoaderCircle } from 'lucide-react'
import { useParams } from 'next/navigation'
import { type Dispatch, type SetStateAction, useState } from 'react'
import { type RegisteringPatient } from '@/components/hospital/icu/sidebar/register-dialog/register-dialog'

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
  const { target_date } = useParams()

  const [isLoading, setIsLoading] = useState(false)

  const handlePatientClick = async () => {
    setIsLoading(true)

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

    setIsConfirmDialogOpen!(true)
  }

  return (
    <Button
      type="button"
      size="icon"
      variant="ghost"
      onClick={handlePatientClick}
      disabled={isLoading}
    >
      {isLoading ? (
        <LoaderCircle size={16} className="animate-spin" />
      ) : (
        <Check size={16} />
      )}
    </Button>
  )
}
