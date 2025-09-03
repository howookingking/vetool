import DeletePatientAlert from '@/components/common/patients/search/delete-patient-alert'
import PatientUpdateDialog from '@/components/common/patients/upload/patient-update-dialog'
import SpeciesToIcon from '@/components/common/species-to-icon'
import { calculateAge } from '@/lib/utils/utils'
import { type Patients } from '@/types'
import { type Species } from '@/types/hospital/calculator'
import { type ColumnDef } from '@tanstack/react-table'
import { type Dispatch, type SetStateAction } from 'react'
import { type DebouncedState } from 'use-debounce'
import { type RegisteringPatient } from '@/components/hospital/icu/sidebar/register-dialog/register-dialog'
import NonIcuRegisterButton from './non-icu-register-button'

type Props = {
  isIcu: boolean
  setIsConfirmDialogOpen?: Dispatch<SetStateAction<boolean>>
  setRegisteringPatient?: Dispatch<SetStateAction<RegisteringPatient | null>>
  debouncedSearch: DebouncedState<() => Promise<void>>
}

export const nonIcusearchedPatientsColumns = ({
  isIcu,
  setIsConfirmDialogOpen,
  setRegisteringPatient,
  debouncedSearch,
}: Props): ColumnDef<Patients>[] => {
  const columns: ColumnDef<Patients>[] = [
    {
      accessorKey: 'species',
      header: () => <>종</>,
      cell: ({ row }) => {
        const species = row.original.species as Species
        return (
          <div className="flex items-center justify-center gap-2">
            <SpeciesToIcon species={species} />
          </div>
        )
      },
    },
    {
      accessorKey: 'hos_patient_id',
      header: () => <>환자번호</>,
      cell: ({ row }) => {
        const hosPatientId = row.original.hos_patient_id
        return (
          <div className="flex items-center justify-center gap-2">
            {hosPatientId}
          </div>
        )
      },
    },
    {
      accessorKey: 'name',
      header: () => <>환자명</>,
      cell: ({ row }) => {
        const name = row.original.name
        return (
          <div className="flex items-center justify-center gap-2">{name}</div>
        )
      },
    },
    {
      accessorKey: 'breed',
      header: () => <>품종</>,
      cell: ({ row }) => {
        const breed = row.original.breed
        return (
          <div className="flex items-center justify-center gap-2">{breed}</div>
        )
      },
    },
    {
      accessorKey: 'gender',
      header: () => <>성별</>,
      cell: ({ row }) => {
        const gender = row.original.gender
        return (
          <div className="flex items-center justify-center gap-2">
            {gender.toUpperCase()}
          </div>
        )
      },
    },
    {
      accessorKey: 'birth',
      header: () => <>나이 (생일)</>,
      cell: ({ row }) => {
        const birth = row.original.birth
        return (
          <div className="flex items-center justify-center gap-2">
            {calculateAge(birth)} ({birth})
          </div>
        )
      },
    },
    {
      accessorKey: 'owner_name',
      header: () => <>보호자</>,
      cell: ({ row }) => {
        const ownerName = row.original.owner_name
        return (
          <div className="flex items-center justify-center gap-2">
            {ownerName}
          </div>
        )
      },
    },
    {
      accessorKey: 'created_at',
      header: () => <>등록일</>,
      cell: ({ row }) => {
        const createdAt = row.original.created_at
        return (
          <div className="flex items-center justify-center gap-2">
            {createdAt.slice(0, 10)}
          </div>
        )
      },
    },
  ]

  if (isIcu) {
    columns.push({
      accessorKey: 'register_icu_action',
      header: () => <>환자선택</>,
      cell: ({ row }) => {
        const birth = row.original.birth
        const patientId = row.original.patient_id
        const name = row.original.name
        const species = row.original.species
        const breed = row.original.breed
        const gender = row.original.gender
        return (
          <NonIcuRegisterButton
            birth={birth}
            patientId={patientId}
            patientName={name}
            species={species ?? ''}
            breed={breed ?? ''}
            gender={gender ?? ''}
            setIsConfirmDialogOpen={setIsConfirmDialogOpen!}
            setRegisteringPatient={setRegisteringPatient!}
          />
        )
      },
    })
  } else {
    columns.push({
      accessorKey: 'update_patient_action',
      header: () => <>수정</>,
      cell: ({ row }) => {
        const patientData = row.original
        return (
          <PatientUpdateDialog
            editingPatient={patientData}
            debouncedSearch={debouncedSearch}
          />
        )
      },
    })

    columns.push({
      accessorKey: 'delete_patient_action',
      header: () => <>삭제</>,
      cell: ({ row }) => {
        const patientId = row.original.patient_id
        const patientName = row.original.name
        return (
          <DeletePatientAlert
            patientId={patientId}
            patientName={patientName}
            debouncedSearch={debouncedSearch}
          />
        )
      },
    })
  }

  return columns
}
