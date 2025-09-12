import ChecklistBodyContainer from '@/components/hospital/checklist/checklist-body/checklist-body-container'
import ChecklistPatientInfo from '@/components/hospital/checklist/common/checklist-patient-info'
import { getChecklistDataById } from '@/lib/services/checklist/get-checklist-data-client'
import type {
  ChecklistData,
  ChecklistVet,
} from '@/types/checklist/checklist-type'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import ChecklistRegisterDialog from '@/components/hospital/checklist/sidebar/checklist-register-dialog/checklist-register-dialog'
import NoResultSquirrel from '@/components/common/no-result-squirrel'
import { Checklist } from '@/types'

export default async function ChecklistBody(props: {
  children: React.ReactNode
  params: Promise<{
    hos_id: string
    target_date: string
    checklist_id: string
  }>
}) {
  const params = await props.params
  const _checklistdata: Checklist = await getChecklistDataById(
    params.checklist_id,
  )
  let checklistdata: ChecklistData | null = null
  if (_checklistdata) {
    checklistdata = _checklistdata as ChecklistData
  }

  return checklistdata &&
    ((checklistdata.checklist_title &&
      checklistdata.checklist_vet?.attending) ||
      checklistdata.checklist_type === '응급') ? (
    <div className="ml-3 flex-col">
      <div className="m-3 text-xl font-bold">
        {checklistdata.checklist_title}
      </div>
      {checklistdata.patient_id ? (
        <ChecklistPatientInfo
          patientId={checklistdata.patient_id}
          checklistdata={_checklistdata}
        />
      ) : (
        checklistdata && (
          <div className="m-3">
            {' '}
            <ChecklistRegisterDialog
              hosId={checklistdata.hos_id ?? ''}
              checklistData={_checklistdata}
            />
          </div>
        )
      )}

      <Table className="m-3 w-[400px] border text-left text-sm text-gray-700">
        <TableBody>
          <TableRow className="transition-colors hover:bg-muted/20">
            <TableCell>시작시간</TableCell>
            <TableCell>
              {checklistdata.starttime &&
                new Date(checklistdata.starttime).toLocaleTimeString('ko-KR', {
                  hour12: false,
                })}
            </TableCell>
          </TableRow>
          <TableRow className="bg-muted/30 hover:bg-muted/40">
            <TableCell>종료시간</TableCell>
            <TableCell>
              {checklistdata.endtime &&
                new Date(checklistdata.endtime).toLocaleTimeString('ko-KR', {
                  hour12: false,
                })}
            </TableCell>
          </TableRow>
          <TableRow className="transition-colors hover:bg-muted/20">
            <TableCell>추가정보</TableCell>
            <TableCell>
              {checklistdata.checklist_type === '응급' &&
              checklistdata.preinfo?.other
                ? '기관튜브(' + checklistdata.preinfo?.other.split('#')[0] + ')'
                : null}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <ChecklistBodyContainer checklistData={checklistdata as ChecklistData} />
    </div>
  ) : (
    <NoResultSquirrel
      text="👆 담당의 및 제목 설정이 필요합니다."
      className="h-screen flex-col"
      size="lg"
    />
  )
}
