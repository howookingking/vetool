'use client'

import PatientInfo from '@/components/hospital/common/patient-info'
import ChecklistInput from '@/components/hospital/icu/main/out-and-visit/checklist-input'
import ChecklistTime from '@/components/hospital/icu/main/out-and-visit/checklist-time'
import { CancelOutDue } from '@/components/hospital/icu/main/out-and-visit/icu-out-chart/cancel-out-due'
import GoToButton from '@/components/hospital/icu/main/out-and-visit/icu-out-chart/go-to-button'
import type { OutDuePatientsData } from '@/types/icu/movement'
import { ColumnDef } from '@tanstack/react-table'

export const outDueColumns: ColumnDef<OutDuePatientsData>[] = [
  {
    accessorKey: 'patientName',
    header: '환자 이름',
    cell: ({ row }) => {
      const name = row.original.patient.name
      const breed = row.original.patient.breed
      const species = row.original.patient.species
      const isDischarged = row.original.out_date !== null

      return (
        <PatientInfo
          name={name}
          species={species}
          breed={breed}
          isDone={isDischarged}
          className="justify-center"
        />
      )
    },
  },
  {
    accessorKey: 'outTime',
    header: '퇴원 시각',
    cell: ({ row }) => {
      const outTime = row.original.out_time
      const isDischarged = row.original.out_date !== null
      const icuIoId = row.original.icu_io_id

      return (
        <ChecklistTime
          checkType="out_time"
          icuIoId={icuIoId}
          time={outTime}
          isDischarged={isDischarged}
        />
      )
    },
  },
  {
    accessorKey: 'basicCare',
    header: '기본 관리',
    cell: ({ row }) => {
      const basicCare = row.original.basic_care
      const isDischarged = row.original.out_date !== null
      const icuIoId = row.original.icu_io_id

      return (
        <ChecklistInput
          icuIoId={icuIoId}
          isDischarged={isDischarged}
          checkType="basic_care"
          value={basicCare}
        />
      )
    },
  },
  {
    accessorKey: 'belongings',
    header: '소지품',
    cell: ({ row }) => {
      const belongings = row.original.belongings
      const isDischarged = row.original.out_date !== null
      const icuIoId = row.original.icu_io_id

      return (
        <ChecklistInput
          icuIoId={icuIoId}
          isDischarged={isDischarged}
          checkType="belongings"
          value={belongings}
        />
      )
    },
  },
  {
    accessorKey: 'prescription',
    header: '처방식',
    cell: ({ row }) => {
      const prescription = row.original.prescription
      const isDischarged = row.original.out_date !== null

      const icuIoId = row.original.icu_io_id

      return (
        <ChecklistInput
          icuIoId={icuIoId}
          isDischarged={isDischarged}
          value={prescription}
          checkType="prescription"
        />
      )
    },
  },
  {
    accessorKey: 'etc',
    header: '기타',
    cell: ({ row }) => {
      const etc = row.original.etc
      const isDischarged = row.original.out_date !== null
      const icuIoId = row.original.icu_io_id

      return (
        <ChecklistInput
          icuIoId={icuIoId}
          isDischarged={isDischarged}
          checkType="etc"
          value={etc}
        />
      )
    },
  },
  {
    accessorKey: 'active',
    header: '이동',
    cell: ({ row }) => {
      const patientId = row.original.patient.patient_id

      return <GoToButton patientId={patientId} />
    },
  },
  {
    accessorKey: 'cancel',
    header: '취소',
    cell: ({ row }) => {
      const icuIoId = row.original.icu_io_id
      const isDischarged = row.original.out_date !== null

      return <CancelOutDue icuIoId={icuIoId} isDischarged={isDischarged} />
    },
  },
]
