import DeletePatientAlert from '@/components/hospital/patients/delete-patient-alert'
import PatientUpdateDialog from '@/components/hospital/patients/patient-update-dialog'
import { TableCell, TableRow } from '@/components/ui/table'
import { calculateAge, cn, convertPascalCased } from '@/lib/utils/utils'
import { type SearchedPatientsData } from '@/types/patients'
import { Cat, Dog } from 'lucide-react'
import { type Dispatch, type SetStateAction } from 'react'
import { type RegisteringPatient } from '../register-dialog'
import PatientSelectButton from './patient-select-button'
import { useBasicHosDataContext } from '@/providers/basic-hos-data-context-provider'
import { canAddChart } from '@/constants/plans'

type Props = {
  patientData: SearchedPatientsData
  setIsEdited: Dispatch<SetStateAction<boolean>>
  isIcu?: boolean
  setIsConfirmDialogOpen?: Dispatch<SetStateAction<boolean>>
  setRegisteringPatient?: Dispatch<SetStateAction<RegisteringPatient | null>>
}

export default function SearchPatientTableRow({
  patientData,
  setIsEdited,
  isIcu,
  setIsConfirmDialogOpen,
  setRegisteringPatient,
}: Props) {
  const {
    patient_id,
    hos_id,
    species,
    hos_patient_id,
    name,
    breed,
    gender,
    birth,
    owner_name,
    created_at,
    is_alive,
  } = patientData

  return (
    <TableRow>
      <TableCell className="w-16 whitespace-nowrap text-center">
        {species === 'canine' ? (
          <Dog className="mx-auto" size={20} />
        ) : (
          <Cat className="mx-auto" size={20} />
        )}
      </TableCell>

      <TableCell className="whitespace-nowrap text-center">
        {hos_patient_id}
      </TableCell>

      <TableCell
        className={cn(
          'whitespace-nowrap text-center',
          !is_alive && 'text-destructive',
        )}
      >
        {name} {!is_alive && '(사망)'}
      </TableCell>

      <TableCell className="whitespace-nowrap text-center">
        <div className="truncate" title={convertPascalCased(breed) ?? ''}>
          {convertPascalCased(breed) ?? ''}
        </div>
      </TableCell>

      <TableCell className="whitespace-nowrap text-center">
        {gender.toUpperCase()}
      </TableCell>

      <TableCell className="whitespace-nowrap text-center">
        {calculateAge(birth)} ({birth})
      </TableCell>

      <TableCell className="whitespace-nowrap text-center">
        {owner_name}
      </TableCell>

      <TableCell className="whitespace-nowrap text-center">
        {created_at.slice(0, 10)}
      </TableCell>

      {isIcu ? (
        <TableCell className="whitespace-nowrap text-center">
          <PatientSelectButton
            patientId={patient_id}
            birth={birth}
            patientName={name}
            setIsConfirmDialogOpen={setIsConfirmDialogOpen!}
            setRegisteringPatient={setRegisteringPatient!}
          />
        </TableCell>
      ) : (
        <>
          <TableCell className="whitespace-nowrap text-center">
            <PatientUpdateDialog
              hosId={hos_id}
              editingPatient={patientData}
              setIsEdited={setIsEdited}
            />
          </TableCell>

          <TableCell className="whitespace-nowrap text-center">
            <DeletePatientAlert patientName={name} patientId={patient_id} />
          </TableCell>
        </>
      )}
    </TableRow>
  )
}
