import { string } from 'zod'

type ChecklistVet = {
  attending?: null | string
  primary?: null | string
  assistence?: null | string
  anesthesia?: null | string
}
export type ChecklistProtocolItem = {
  txStart?: null | number
  txEnd?: null | number
  title?: null | string
  type?: null | string
  addinfo?: null | string
  dueStart?: null | string
  mode?: null | string
  isImg?: null | boolean
  imgUrl?: null | string[]
}
export type ChecklistProtocol = ChecklistProtocolItem[]

type timeTable = {
  time?: null | number
  txt?: null | string
  type?: null | string
  imgurl?: null | string
}

type Checklistset = {
  interval?: string | null
  preSet?: {
    setname: string[] | null
    settime: string | null
  }[]
  result?: {
    [key: string]: string | number | boolean | null
  }[]
} | null

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
  checklist_timetable: null | timeTable
  starttime: null | string
  endtime: null | string
  comment: null | string
  preinfo: null | PreInfo
  due_date: null | string
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
  checklist_timetable: null | timeTable
  starttime: null | string
  endtime: null | string
  comment: null | string
  preinfo: null | PreInfo
  due_date: null | string
}
export type TxTypes = string[]
