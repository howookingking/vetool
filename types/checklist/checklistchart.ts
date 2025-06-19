import { string } from 'zod'

type ChecklistVet = {
  attending?: null | string
  primary?: null | string
  assistence?: null | string
  anesthesia?: null | string
}
export type ChecklistProtocolItem = {
  txStart?: null | string
  txEnd?: null | string
  title?: null | string
  type?: null | string
  addinfo?: null | string
  dueStart?: null | string
  mode?: null | string
  isImg?: null | boolean
  imgUrl?: null | string[]
}
export type ChecklistProtocol = ChecklistProtocolItem[]

export type TimeTable = {
  time?: null | string
  txt?: null | string
  type?: null | string
  imgurl?: null | string
}[]

export type Checklistset = {
  interval?: string | null
  preSet?: {
    setname: string[] | null
    settime: string | null
  }[]
  result?: Record<string, ChecklistResults>
}

export type ChecklistResults = Record<string, string>

// export type ChecklistResults =
//   | {
//       key: string: string
//     }
//   | null

type PreInfo = {
  pre: string | null
  induce: string | null
  main: string | null
  post: string | null
} | null
export type Filterdcheck = {
  todaycheck: [] | ChecklistSidebarData[]
  othercheck: [] | ChecklistSidebarData[]
  donecheck: [] | ChecklistSidebarData[]
}

export type ChecklistPatinet = {
  patient_id: string
  name?: string | null
  species?: string | null
  gender?: string | null
  birth?: string | null
  breed?: string | null
  hos_patient_id?: string | null
}
export type ChecklistSidebarData = {
  checklist_id: string
  hos_id: string
  patient_id: string
  patients: ChecklistPatinet
  checklist_type: null | string
  checklist_vet: null | ChecklistVet
  checklist_title: null | string
  checklist_tag: null | string
  checklist_protocol: null | ChecklistProtocol
  checklist_group: null | string
  checklist_set: null | Checklistset
  checklist_timetable: null | TimeTable
  starttime: null | string
  endtime: null | string
  comment: null | string
  preinfo: null | PreInfo
  due_date: null | string
  age_in_days: number
  weight: number
}
export type TxchartData = {
  checklist_id: string
  hos_id: string
  patient_id: string
  checklist_type: null | string
  checklist_vet: null | ChecklistVet
  checklist_title: null | string
  checklist_tag: null | string
  checklist_protocol: null | ChecklistProtocol
  checklist_group: null | string
  checklist_set: null | Checklistset
  checklist_timetable: null | TimeTable
  starttime: null | string
  endtime: null | string
  comment: null | string
  preinfo: null | PreInfo
  due_date: null | string
  age_in_days: number
  weight: number
}
export type TxTypes = string[]

export type TxChart = {
  checklist_id: string
  hos_id: string
  patient_id: string
  checklist_type: null | string
  checklist_vet: null | ChecklistVet
  checklist_title: null | string
  checklist_tag: null | string
  checklist_protocol: null | ChecklistProtocol
  checklist_group: null | string
  checklist_set: null | Checklistset
  checklist_timetable: null | TimeTable
  starttime: null | string
  endtime: null | string
  comment: null | string
  preinfo: null | PreInfo
  due_date: null | string
  age_in_days: number
  weight: number
}

export type CheckItem = { displayName: string; name: string; type: string }
export type CheckNameArray = CheckItem[]
export type PreSetItem = {
  setname: string[] | null
  settime: string | null
}
export type ChecklistStateSet = {
  interval?: string | null
  preSet?: PreSetItem[] | null
}
export type ProtocolItem = {
  title: string | null
  type: string | null
  addinfo: string | null
  dueStart: string | null
  mode: string | null
}
