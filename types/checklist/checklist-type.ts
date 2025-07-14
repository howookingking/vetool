import { string } from 'zod'

export type ChecklistData = {
  checklist_id: string
  hos_id: string
  patient_id: string
  checklist_type: null | string
  checklist_vet: null | ChecklistVet
  checklist_title: null | string
  checklist_tag: null | string
  checklist_protocol: null | ChecklistProtocol
  checklist_group: null | string[]
  checklist_set: null | Checklistset
  checklist_timetable: null | TimeTable
  starttime: null | string
  endtime: null | string
  comment: null | string
  preinfo: null | PreInfo
  due_date: null | string
  age_in_days: number
  weight: number
  istxing: boolean
  enddate: null | string
}
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

export type TimeTable = {
  time?: null | number
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

type PreInfo = {
  pre: string | null
  induce: string | null
  main: string | null
  post: string | null
  other: string | null
} | null

export type FilteredChecklist = {
  today: [] | ChecklistData[]
  todaydone: [] | ChecklistData[]
  ing: [] | ChecklistData[]
}
export type ChecklistPatient = {
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
  patients: ChecklistPatient
  checklist_type: null | string
  checklist_vet: null | ChecklistVet
  checklist_title: null | string
  checklist_tag: null | string
  checklist_protocol: null | ChecklistProtocol
  checklist_group: null | string[]
  checklist_set: null | Checklistset
  checklist_timetable: null | TimeTable
  starttime: null | string
  endtime: null | string
  comment: null | string
  preinfo: null | PreInfo
  due_date: null | string
  age_in_days: number
  weight: number
  istxing: boolean
  enddate: null | string
}

export type TxTypes = string[]

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

export type TxTemplateChart = {
  checklist_template_id: string
  hos_id: string
  checklist_type: null | string
  checklist_title: null | string
  checklist_tag: null | string
  checklist_protocol: null | ChecklistProtocol
  checklist_set: null | Checklistset
  preinfo: null | PreInfo
  share_ids: null | string[]
}
