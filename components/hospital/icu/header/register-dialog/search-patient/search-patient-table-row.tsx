import DeletePatientAlert from '@/components/hospital/patients/delete-patient-alert'
import PatientUpdateDialog from '@/components/hospital/patients/patient-update-dialog'
import { TableCell, TableRow } from '@/components/ui/table'
import { calculateAge, cn, convertPascalCased } from '@/lib/utils/utils'
import type { SearchedPatientsData } from '@/types/patients'
import { Cat, Dog } from 'lucide-react'
import { Dispatch, SetStateAction } from 'react'
import PatientSelectButton from './patient-select-button'

export default function SearchPatientTableRow({
  patientData,
  setIsEdited,
  isIcu,
}: {
  patientData: SearchedPatientsData
  setIsEdited: Dispatch<SetStateAction<boolean>>
  isIcu?: boolean
}) {
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
      {/* 종 */}
      <TableCell className="w-16 whitespace-nowrap text-center">
        {species === 'canine' ? (
          <Dog className="mx-auto" size={20} />
        ) : (
          <Cat className="mx-auto" size={20} />
        )}
      </TableCell>

      {/* 환자 번호 */}
      <TableCell className="whitespace-nowrap text-center">
        {hos_patient_id}
      </TableCell>

      {/* 환자 이름 */}
      <TableCell
        className={cn(
          'whitespace-nowrap text-center',
          !is_alive && 'text-destructive',
        )}
      >
        {name} {!is_alive && '(사망)'}
      </TableCell>

      {/* 품종 */}
      <TableCell className="whitespace-nowrap text-center">
        <div className="truncate" title={convertPascalCased(breed) ?? ''}>
          {convertPascalCased(breed) ?? ''}
        </div>
      </TableCell>

      {/* 성별 */}
      <TableCell className="whitespace-nowrap text-center">
        {gender.toUpperCase()}
      </TableCell>

      {/* 나이 (생일) */}
      <TableCell className="whitespace-nowrap text-center">
        {calculateAge(birth)} ({birth})
      </TableCell>

      {/* 보호자 이름 */}
      <TableCell className="whitespace-nowrap text-center">
        {owner_name}
      </TableCell>

      {/* 등록일 */}
      <TableCell className="whitespace-nowrap text-center">
        {created_at.slice(0, 10)}
      </TableCell>

      {isIcu ? (
        <TableCell className="whitespace-nowrap text-center">
          <PatientSelectButton
            patientId={patient_id}
            birth={birth}
            patientName={name}
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
