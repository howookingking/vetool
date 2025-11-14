'use client'

import PatientBriefInfo from '@/components/hospital/common/patient/patient-brief-info'
import { DEFAULT_VISIT_CHART } from '@/constants/hospital/icu/chart/out-and-visit'
import { VisitDuePatents } from '@/lib/services/icu/out-and-visit/icu-visit-chart'
import type { Species } from '@/types/hospital/calculator'
import { ColumnDef } from '@tanstack/react-table'
import CompleteVisitButton from './complete-visit-button'
import VisitTextarea from './visit-text-area'
import VisitTimeInput from './visit-time-input'
import { CancelVisit } from './cancel-visit'
import GoToButton from '../icu-out-chart/go-to-button'

export const visitDueColumn: ColumnDef<VisitDuePatents>[] = [
  {
    accessorKey: 'patientName',
    header: '환자',
    cell: ({ row }) => {
      const name = row.original.patients.name
      const breed = row.original.patients.breed
      const species = row.original.patients.species
      const isDone = row.original.visit_chart?.is_done

      return (
        <PatientBriefInfo
          name={name}
          species={species as Species}
          breed={breed}
          className={isDone ? 'text-muted-foreground' : ''}
        />
      )
    },
    size: 100,
  },

  {
    accessorKey: 'time',
    header: '면회시간',
    cell: ({ row }) => {
      const icuChartId = row.original.icu_chart_id
      const visitChart = row.original.visit_chart

      return (
        <VisitTimeInput
          icuChartId={icuChartId}
          visitChart={visitChart ?? DEFAULT_VISIT_CHART}
        />
      )
    },
    size: 120,
  },
  {
    accessorKey: 'place',
    header: '면회장소',
    cell: ({ row }) => {
      const icuChartId = row.original.icu_chart_id
      const visitChart = row.original.visit_chart
      return (
        <VisitTextarea
          filedName="visit_area"
          icuChartId={icuChartId}
          visitChart={visitChart ?? DEFAULT_VISIT_CHART}
        />
      )
    },
    minSize: 200,
  },
  {
    accessorKey: 'preparation',
    header: '면회 준비',
    cell: ({ row }) => {
      const icuChartId = row.original.icu_chart_id
      const visitChart = row.original.visit_chart
      return (
        <VisitTextarea
          filedName="preparation"
          icuChartId={icuChartId}
          visitChart={visitChart ?? DEFAULT_VISIT_CHART}
        />
      )
    },
    minSize: 200,
  },

  {
    accessorKey: 'consultation',
    header: '상담',
    cell: ({ row }) => {
      const icuChartId = row.original.icu_chart_id
      const visitChart = row.original.visit_chart
      return (
        <VisitTextarea
          filedName="consultation_status"
          icuChartId={icuChartId}
          visitChart={visitChart ?? DEFAULT_VISIT_CHART}
        />
      )
    },
    minSize: 200,
  },
  {
    accessorKey: 'visit_etc',
    header: '기타',
    cell: ({ row }) => {
      const icuChartId = row.original.icu_chart_id
      const visitChart = row.original.visit_chart
      return (
        <VisitTextarea
          filedName="etc"
          icuChartId={icuChartId}
          visitChart={visitChart ?? DEFAULT_VISIT_CHART}
        />
      )
    },
    minSize: 200,
  },

  {
    accessorKey: 'action',
    header: '완료',
    cell: ({ row }) => {
      const icuChartId = row.original.icu_chart_id
      const visitChart = row.original.visit_chart
      return (
        <CompleteVisitButton
          icuChartId={icuChartId}
          visitChart={visitChart ?? DEFAULT_VISIT_CHART}
        />
      )
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
      const icuChartId = row.original.icu_chart_id
      const visitChart = row.original.visit_chart
      return (
        <CancelVisit
          icuChartId={icuChartId}
          visitChart={visitChart ?? DEFAULT_VISIT_CHART}
        />
      )
    },
    size: 60,
  },
]
