import type { ChecklistType } from '@/constants/checklist/checklist'

export type ChecklistData = {
  checklist_id: string
  hos_id: string
  patient_id: string
  checklist_type: ChecklistType
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

export type ChecklistVet = {
  main_vet: string // 담당의 user_id
  primary: string // 집도의 user_id
  anesthesia: string // 마취의 user_id
  assistance: string // "김아무개"
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

export type PreInfo = {
  pre: string
  induce: string
  main: string
  post: string
  other: string
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

export type TemplateChecklist = {
  checklist_template_id: string
  hos_id: string
  created_at?: string
  checklist_type: string //'checklist' | 'surgery'
  checklist_title: string //tamplate이름
  checklist_tag: null | string //검색어
  checklist_protocol: null | ChecklistProtocol
  checklist_set: null | Checklistset
  preinfo: null | PreInfo //처치 정보
}

export type HosChecklistSet = {
  hos_checklist_set_id: string
  hos_id: string
  sharing: { hos_id: string; isShared: boolean; class: string }[]
}

export type ReportPatient = {
  patient_id: string | null
  name: string | null
  species: string | null
  breed: string | null
  gender: string | null
  birth: string | null
  hos_patient_id: string | null
}
