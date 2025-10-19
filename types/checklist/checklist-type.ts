import { MemoColor } from '../icu/chart'

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
  interval: number // 측정간격 (분) default 1
  preSet: number[]
  result: Record<string, string[]>
}

export type TxMemo = {
  id: string
  memo: string
  color: MemoColor
  edit_timestamp: string | null
  done_time: string | null
  is_done: boolean
  create_timestamp: string
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

// export type TemplateChecklist = {
//   checklist_template_id: string
//   hos_id: string
//   created_at?: string
//   checklist_type: string //'checklist' | 'surgery'
//   checklist_title: string //tamplate이름
//   checklist_tag: null | string //검색어
//   checklist_protocol: null | ChecklistProtocol
//   checklist_set: null | Checklistset
//   preinfo: null | PreInfo //처치 정보
// }

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
