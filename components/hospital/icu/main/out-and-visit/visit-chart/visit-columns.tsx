'use client'

import PatientInfo from '@/components/hospital/common/patient-info'
import type { VisitPatientData } from '@/types/icu/movement'
import { ColumnDef } from '@tanstack/react-table'
import ChecklistInput from '../checklist-input'
import ChecklistTime from '../checklist-time'
import { CancelVisit } from './cancel-visit'
import CompleteVisitButton from './complete-visit-button'

export const visitColumns: ColumnDef<VisitPatientData>[] = [
  {
    accessorKey: 'patientName',
    header: '환자 이름',
    cell: ({ row }) => {
      const name = row.original.patient.name
      const breed = row.original.patient.breed
      const species = row.original.patient.species
      const isDone = row.original.is_done

      return (
        <PatientInfo
          name={name}
          species={species}
          breed={breed}
          isDone={isDone}
          className="justify-center"
        />
      )
    },
  },

  {
    accessorKey: 'time',
    header: '면회 시각',
    cell: ({ row }) => {
      const visitTime = row.original.time
      const icuIoId = row.original.icu_io_id
      const isDone = row.original.is_done
      const visitId = row.original.icu_visit_id

      return (
        <ChecklistTime
          key={visitId}
          checkType="time"
          icuIoId={icuIoId}
          time={visitTime}
          isDischarged={isDone}
          visitId={visitId}
        />
      )
    },
  },
  {
    accessorKey: 'place',
    header: '면회 장소',
    cell: ({ row }) => {
      const place = row.original.place
      const icuIoId = row.original.icu_io_id
      const isDone = row.original.is_done
      const visitId = row.original.icu_visit_id

      return (
        <ChecklistInput
          icuIoId={icuIoId}
          checkType="place"
          value={place}
          isDischarged={isDone}
          visitId={visitId}
        />
      )
    },
  },
  {
    accessorKey: 'preparation',
    header: '면회 준비',
    cell: ({ row }) => {
      const preparation = row.original.preparation
      const icuIoId = row.original.icu_io_id
      const isDone = row.original.is_done
      const visitId = row.original.icu_visit_id

      return (
        <ChecklistInput
          icuIoId={icuIoId}
          checkType="preparation"
          value={preparation}
          isDischarged={isDone}
          visitId={visitId}
        />
      )
    },
  },

  {
    accessorKey: 'consultation',
    header: '상담 여부',
    cell: ({ row }) => {
      const consultationStatus = row.original.consultation_status
      const icuIoId = row.original.icu_io_id
      const isDone = row.original.is_done
      const visitId = row.original.icu_visit_id

      return (
        <ChecklistInput
          icuIoId={icuIoId}
          checkType="consultation_status"
          value={consultationStatus}
          isDischarged={isDone}
          visitId={visitId}
        />
      )
    },
  },
  {
    accessorKey: 'visit_etc',
    header: '기타',
    cell: ({ row }) => {
      const etc = row.original.visit_etc
      const icuIoId = row.original.icu_io_id
      const isDone = row.original.is_done
      const visitId = row.original.icu_visit_id

      return (
        <ChecklistInput
          icuIoId={icuIoId}
          checkType="visit_etc"
          value={etc}
          isDischarged={isDone}
          visitId={visitId}
        />
      )
    },
  },
  {
    accessorKey: 'mainVet',
    header: '주치의',
    cell: ({ row }) => {
      const mainVet = row.original.main_vet

      return <div className="min-w-12 md:min-w-32">{mainVet}</div>
    },
  },
  {
    accessorKey: 'action',
    header: '완료',
    cell: ({ row }) => {
      const visitId = row.original.icu_visit_id
      const isDone = row.original.is_done

      return <CompleteVisitButton visitId={visitId} isDone={isDone} />
    },
  },
  {
    accessorKey: 'cancel',
    header: '취소',
    cell: ({ row }) => {
      const visitId = row.original.icu_visit_id
      const isDone = row.original.is_done

      return <CancelVisit visitId={visitId} isDone={isDone} />
    },
  },
]
