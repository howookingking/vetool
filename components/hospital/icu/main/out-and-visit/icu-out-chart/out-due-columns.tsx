'use client'

import PatientBriefInfo from '@/components/hospital/common/patient/patient-brief-info'
import { CancelOutDue } from '@/components/hospital/icu/main/out-and-visit/icu-out-chart/cancel-out-due'
import GoToButton from '@/components/hospital/icu/main/out-and-visit/icu-out-chart/go-to-button'
import OutTextarea from '@/components/hospital/icu/main/out-and-visit/icu-out-chart/out-textarea'
import OutTimeInput from '@/components/hospital/icu/main/out-and-visit/icu-out-chart/out-time-input'
import { DEFAULT_OUT_CHART } from '@/constants/hospital/icu/chart/out-and-visit'
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
    header: '퇴원시간',
    cell: ({ row }) => {
      const isDischarged = row.original.out_date !== null
      const icuIoId = row.original.icu_io_id
      const outChart = row.original.out_chart

      return (
        <OutTimeInput
          icuIoId={icuIoId}
          outChart={outChart ?? DEFAULT_OUT_CHART} // 기능 추가된거라서 혹시 과거 시간드로 갔을 때 에러발생할 수 있어서 FALLBACK있었야함
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
        <OutTextarea
          icuIoId={icuIoId}
          isDischarged={isDischarged}
          filedName="basic_care"
          outChart={outChart ?? DEFAULT_OUT_CHART}
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
        <OutTextarea
          icuIoId={icuIoId}
          isDischarged={isDischarged}
          filedName="belongings"
          outChart={outChart ?? DEFAULT_OUT_CHART}
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
        <OutTextarea
          icuIoId={icuIoId}
          isDischarged={isDischarged}
          outChart={outChart ?? DEFAULT_OUT_CHART}
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
        <OutTextarea
          icuIoId={icuIoId}
          isDischarged={isDischarged}
          filedName="etc"
          outChart={outChart ?? DEFAULT_OUT_CHART}
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
