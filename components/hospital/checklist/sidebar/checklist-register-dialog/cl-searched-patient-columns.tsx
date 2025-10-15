import SpeciesToIcon from '@/components/common/species-to-icon'
import { calculateAge } from '@/lib/utils/utils'
import type { Patient } from '@/types'
import type { Species } from '@/types/hospital/calculator'
import type { ColumnDef } from '@tanstack/react-table'
import type { Dispatch, SetStateAction } from 'react'
import SelectedPatientToClDialog from './selected-patient-to-cl-dialog'

type Props = {
  hosId: string
  targetDate: string
  setIsRegisterDialogOpen: Dispatch<SetStateAction<boolean>>
}

export const clSearchedPatientsColumns = ({
  hosId,
  targetDate,
  setIsRegisterDialogOpen,
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
    {
      accessorKey: 'register_checklist_action',
      header: () => '환자선택',
      cell: ({ row }) => {
        const patientId = row.original.patient_id
        const name = row.original.name
        const birth = row.original.birth
        return (
          <SelectedPatientToClDialog
            patientId={patientId}
            name={name}
            birth={birth}
            hosId={hosId}
            targetDate={targetDate}
            setIsRegisterDialogOpen={setIsRegisterDialogOpen}
          />
        )
      },
    },
  ]

  return columns
}
