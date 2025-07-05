import type { Owner, Patient, Vitals } from '@/types'

export type PatientDataTable = Omit<Patient, 'owner_id'> & {
  owner_id?: Owner
  isIcu: boolean
}
//  hos_patient_id, name, species, breed, gender, birth, owner_name

export type PatientsIdData = Pick<Patient, 'patient_id'>

export type PaginatedData<T> = {
  data: T
  total_count: number
  page: number
  itemsPerPage: number
}

export type OwnerDataTable = Owner

export type PatientWithWeight = {
  patient: Pick<
    Patient,
    'patient_id' | 'name' | 'species' | 'breed' | 'gender' | 'birth'
  >
  vital: Pick<Vitals, 'body_weight' | 'created_at'> | null
}
