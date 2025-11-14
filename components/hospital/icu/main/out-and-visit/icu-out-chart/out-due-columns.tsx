'use client'

import PatientBriefInfo from '@/components/hospital/common/patient/patient-brief-info'
import ChecklistTime from '@/components/hospital/icu/main/out-and-visit/checklist-time'
import { CancelOutDue } from '@/components/hospital/icu/main/out-and-visit/icu-out-chart/cancel-out-due'
import GoToButton from '@/components/hospital/icu/main/out-and-visit/icu-out-chart/go-to-button'
import OutAndVisitRowTextarea from '@/components/hospital/icu/main/out-and-visit/out-and-visit-row-textarea'
import type { OutDuePatientsData } from '@/lib/services/icu/out-and-visit/icu-out-chart'
import type { Species } from '@/types/hospital/calculator'
import { ColumnDef } from '@tanstack/react-table'
import OutPatientDialog from '../../chart/selected-chart/chart-header/header-right-buttons/out-patient-dialog/out-patient-dialog'

export const outDueColumns: ColumnDef<OutDuePatientsData>[] = [
  {
    accessorKey: 'patientName',
    header: ({ table }) => (
      <div>
        환자
        {table.getRowModel().rows.length > 0
          ? `(${table.getRowModel().rows.length})`
          : ''}
      </div>
    ),
    cell: ({ row }) => {
      const name = row.original.patients.name
      const breed = row.original.patients.breed
      const species = row.original.patients.species
      const isDischarged = row.original.out_date !== null

      return (
        <PatientBriefInfo
          name={name}
          species={species as Species}
          breed={breed}
          width={100}
          className={isDischarged ? 'text-muted-foreground' : ''}
        />
      )
    },
    size: 100,
  },
  {
    accessorKey: 'outTime',
    header: '퇴원예정시각',
    cell: ({ row }) => {
      const isDischarged = row.original.out_date !== null
      const icuIoId = row.original.icu_io_id
      const outChart = row.original.out_chart

      return (
        <ChecklistTime
          type="out"
          icuIoId={icuIoId}
          outChart={outChart}
          isDischarged={isDischarged}
        />
      )
    },
    size: 120,
  },
  {
    accessorKey: 'basicCare',
    header: '기본 관리',
    cell: ({ row }) => {
      const outChart = row.original.out_chart
      const isDischarged = row.original.out_date !== null
      const icuIoId = row.original.icu_io_id

      return (
        <OutAndVisitRowTextarea
          icuIoId={icuIoId}
          isDischarged={isDischarged}
          filedName="basic_care"
          outChart={outChart}
        />
      )
    },
    minSize: 200,
  },
  {
    accessorKey: 'belongings',
    header: '소지품',
    cell: ({ row }) => {
      const outChart = row.original.out_chart
      const isDischarged = row.original.out_date !== null
      const icuIoId = row.original.icu_io_id

      return (
        <OutAndVisitRowTextarea
          icuIoId={icuIoId}
          isDischarged={isDischarged}
          filedName="belongings"
          outChart={outChart}
        />
      )
    },
    minSize: 200,
  },
  {
    accessorKey: 'prescription',
    header: '처방식',
    cell: ({ row }) => {
      const outChart = row.original.out_chart
      const isDischarged = row.original.out_date !== null
      const icuIoId = row.original.icu_io_id

      return (
        <OutAndVisitRowTextarea
          icuIoId={icuIoId}
          isDischarged={isDischarged}
          outChart={outChart}
          filedName="prescription"
        />
      )
    },
    minSize: 200,
  },
  {
    accessorKey: 'etc',
    header: '기타',
    cell: ({ row }) => {
      const outChart = row.original.out_chart
      const isDischarged = row.original.out_date !== null
      const icuIoId = row.original.icu_io_id

      return (
        <OutAndVisitRowTextarea
          icuIoId={icuIoId}
          isDischarged={isDischarged}
          filedName="etc"
          outChart={outChart}
        />
      )
    },
    minSize: 200,
  },
  {
    accessorKey: 'out',
    header: '퇴원',
    cell: ({ row }) => {
      const patient = row.original.patients
      const icuIo = row.original

      return <OutPatientDialog icuIo={icuIo} patient={patient} />
    },

    size: 60,
  },
  {
    accessorKey: 'move',
    header: '이동',
    cell: ({ row }) => {
      const patientId = row.original.patients.patient_id

      return <GoToButton patientId={patientId} />
    },

    size: 60,
  },
  {
    accessorKey: 'cancel',
    header: '취소',
    cell: ({ row }) => {
      const icuIoId = row.original.icu_io_id
      const isDischarged = row.original.out_date !== null

      return <CancelOutDue icuIoId={icuIoId} isDischarged={isDischarged} />
    },

    size: 60,
  },
]
