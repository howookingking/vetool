import { Owner, Patients } from '..'

export type PatientDataTable = Omit<Patients, 'owner_id'> & {
  owner_id?: Owner
  isIcu: boolean
}
//  hos_patient_id, name, species, breed, gender, birth, owner_name

export type PatientsIdData = Pick<Patients, 'patient_id'>

export type SearchedPatientsData = Pick<
  Patients,
  | 'hos_id'
  | 'patient_id'
  | 'hos_patient_id'
  | 'name'
  | 'species'
  | 'breed'
  | 'gender'
  | 'birth'
  | 'owner_name'
  | 'created_at'
  | 'is_alive'
  | 'microchip_no'
  | 'memo'
  | 'hos_owner_id'
>

export type PaginatedPatientsData = {
  data: SearchedPatientsData[]
  total_count: number
  page: number
  itemsPerPage: number
}

export type OwnerDataTable = Owner
