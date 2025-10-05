import DeletePatientAlert from '@/components/common/patients/search/delete-patient-alert'
import PatientUpdateDialog from '@/components/common/patients/upload/patient-update-dialog'
import SpeciesToIcon from '@/components/common/species-to-icon'
import RegisterIcuConfirmDialog from '@/components/hospital/icu/sidebar/register-dialog/register-icu-confirm-dialog'
import { calculateAge } from '@/lib/utils/utils'
import type { Patient } from '@/types'
import type { Species } from '@/types/hospital/calculator'
import type { ColumnDef } from '@tanstack/react-table'
import type { Dispatch, SetStateAction } from 'react'
import type { DebouncedState } from 'use-debounce'

type Props = {
  isIcu: boolean
  hosId: string
  debouncedSearch: DebouncedState<() => Promise<void>>
  setIsIcuRegisterDialogOpen?: Dispatch<SetStateAction<boolean>>
}

export const searchedPatientsColumns = ({
  isIcu,
  hosId,
  debouncedSearch,
  setIsIcuRegisterDialogOpen,
}: Props): ColumnDef<Patient>[] => {
  const columns: ColumnDef<Patient>[] = [
    {
      accessorKey: 'species',
      header: () => '종',
      cell: ({ row }) => {
        const species = row.original.species as Species
        return <SpeciesToIcon species={species} />
      },
    },
    {
      accessorKey: 'hos_patient_id',
      header: () => '환자번호',
      cell: ({ row }) => {
        const hosPatientId = row.original.hos_patient_id
        return <>{hosPatientId}</>
      },
    },
    {
      accessorKey: 'name',
      header: () => '환자명',
      cell: ({ row }) => {
        const name = row.original.name
        return <>{name}</>
      },
    },
    {
      accessorKey: 'breed',
      header: () => '품종',
      cell: ({ row }) => {
        const breed = row.original.breed
        return <>{breed}</>
      },
    },
    {
      accessorKey: 'gender',
      header: () => '성별',
      cell: ({ row }) => {
        const gender = row.original.gender
        return <>{gender.toUpperCase()}</>
      },
    },
    {
      accessorKey: 'birth',
      header: () => '나이 (생일)',
      cell: ({ row }) => {
        const birth = row.original.birth
        return (
          <div className="flex items-center justify-center gap-1">
            {calculateAge(birth)}
            <span className="text-xs text-muted-foreground">({birth})</span>
          </div>
        )
      },
    },
    {
      accessorKey: 'owner_name',
      header: () => '보호자',
      cell: ({ row }) => {
        const ownerName = row.original.owner_name
        return <>{ownerName}</>
      },
    },
    {
      accessorKey: 'created_at',
      header: () => '등록일',
      cell: ({ row }) => {
        const createdAt = row.original.created_at
        return <>{createdAt.slice(0, 10)}</>
      },
    },
  ]

  if (isIcu) {
    columns.push({
      accessorKey: 'register_icu_action',
      header: () => '입원',
      cell: ({ row }) => {
        const birth = row.original.birth
        const patientId = row.original.patient_id
        const name = row.original.name
        return (
          <RegisterIcuConfirmDialog
            hosId={hosId}
            birth={birth}
            patientId={patientId}
            patientName={name}
            setIsIcuRegisterDialogOpen={setIsIcuRegisterDialogOpen!}
          />
        )
      },
    })
    // TODO: patient route refactor 할 때 봐야함
  } else {
    columns.push({
      accessorKey: 'update_patient_action',
      header: () => '수정',
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
      header: () => '삭제',
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
