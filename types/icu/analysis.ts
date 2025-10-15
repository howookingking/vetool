import type { IcuIo, Patient, Vet } from '@/types'

export type IcuAnalysisData = {
  icu_io: Pick<IcuIo, 'icu_io_id' | 'in_date' | 'out_date' | 'group_list'>
  patient: Pick<Patient, 'patient_id' | 'name' | 'breed' | 'species'>
  main_vet: Pick<Vet, 'name' | 'user_id'>
  sub_vet: Pick<Vet, 'name' | 'user_id'>
  target_date: string
}

export type ChartData = {
  date: string
  all: number
  canine: number
  feline: number
}
