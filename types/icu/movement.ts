import { IcuOut, IcuVisit, Patients } from '@/types'
import { Vet } from './chart'

export type OutDuePatientsData = IcuOut & {
  hos_id: string
  icu_io_id: string
  out_date: string | null
  patient: Pick<Patients, 'patient_id' | 'name' | 'breed' | 'species'>
}

export type NotOutDuePatientsData = {
  icu_io_id: string
  patient_id: string
  patient: Pick<Patients, 'name' | 'breed'>
}

export type VisitablePatientsData = {
  icu_io_id: string
  vets: Pick<Vet, 'name' | 'user_id'>
  patient: Pick<Patients, 'patient_id' | 'name' | 'breed' | 'species'>
}

export type VisitPatientData = IcuVisit & {
  icu_io_id: string
  patient: Pick<Patients, 'patient_id' | 'name' | 'breed' | 'species'>
}
