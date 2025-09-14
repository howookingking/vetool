import SpeciesToIcon from '@/components/common/species-to-icon'
import { calculateAge } from '@/lib/utils/utils'
import type { Patient } from '@/types'
import type { Species } from '@/types/hospital/calculator'
import type { ColumnDef } from '@tanstack/react-table'
import SelectedPatientToClDialog from './selected-patient-to-cl-dialog'
import type { Dispatch, SetStateAction } from 'react'

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
    {
      accessorKey: 'register_checklist_action',
      header: () => <>환자선택</>,
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
