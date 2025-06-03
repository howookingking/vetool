type checklistVet = {
  attending?: null | string
  primary?: null | string
  assistence?: null | string
  anesthesia?: null | string
}

type checklistProtocol = {
  txStart?: null | number
  txEnd?: null | number
  title?: null | string
  type?: null | string
  addinfo?: null | string
}

type timeTable = {
  time?: null | number
  txt?: null | string
  type?: null | string
  imgurl?: null | string
}

type checklistSet = {
  interval?: null | number
  listname?: null | string
}
export type Filterdcheck = {
  todaycheck: [] | ChecklistSidebarData[]
  othercheck: [] | ChecklistSidebarData[]
  donecheck: [] | ChecklistSidebarData[]
}

export type ChecklistPatinet = {
  patient_id: string
  name: string
  species: string
  gender: string
  birth: string
  breed: string
  hos_patient_id: string
}
export type ChecklistSidebarData = {
  checklist_id: string
  hos_id: string
  patient_id: string
  patients: ChecklistPatinet
  checklist_type?: null | string
  checklist_vet?: null | checklistVet
  checklist_title?: null | string
  checklist_tag?: null | string
  checklist_protocol?: null | checklistProtocol
  checklist_group?: null | string
  checklist_set?: null | checklistSet
  checklist_timetable?: null | timeTable
  starttime?: null | string
  endtime?: null | string
  comment?: null | string
  preinfo?: null | string
  due_date: string
}
