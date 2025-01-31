import PatientForm from '@/components/hospital/patients/patient-form'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { getWeightInfo } from '@/lib/services/patient/patient'
import { type SearchedPatientsData } from '@/types/patients'
import { format } from 'date-fns'
import { Edit } from 'lucide-react'
import { useState, type Dispatch, type SetStateAction } from 'react'

type PatientUpdateDialogProps = {
  hosId: string
  editingPatient: SearchedPatientsData
  setIsEdited: Dispatch<SetStateAction<boolean>>
}

export default function PatientUpdateDialog({
  hosId,
  editingPatient,
  setIsEdited,
}: PatientUpdateDialogProps) {
  const [isPatientUpdateDialogOpen, setIsPatientUpdateDialogOpen] =
    useState(false)
  const [weightInfo, setWeightInfo] = useState({
    weight: '',
    weightMeasuredDate: '',
  })

  const handleOpenChange = (open: boolean) => {
    if (open) {
      getWeightInfo(editingPatient.patient_id).then((data) => {
        if (data) {
          setWeightInfo({
            weight: data?.body_weight ?? '',
            weightMeasuredDate: format(
              new Date(data?.created_at ?? ''),
              'yyyy-MM-dd',
            ),
          })
        }
      })
    }
    setIsPatientUpdateDialogOpen(open)
  }

  return (
    <Dialog open={isPatientUpdateDialogOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button size="icon" variant="ghost">
          <Edit size={16} />
        </Button>
      </DialogTrigger>

      <DialogContent className="flex flex-col sm:max-w-[1000px]">
        <DialogHeader>
          <DialogTitle>{editingPatient.name} 정보 수정</DialogTitle>
          <DialogDescription>환자의 정보를 수정합니다</DialogDescription>
        </DialogHeader>

        <PatientForm
          mode="updateFromPatientRoute"
          weight={weightInfo.weight}
          weightMeasuredDate={weightInfo.weightMeasuredDate}
          hosId={hosId}
          editingPatient={editingPatient}
          setIsPatientUpdateDialogOpen={setIsPatientUpdateDialogOpen}
          setIsEdited={setIsEdited}
        />
      </DialogContent>
    </Dialog>
  )
}
