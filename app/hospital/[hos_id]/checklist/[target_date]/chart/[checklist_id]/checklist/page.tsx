import ChecklistBodyContainer from '@/components/hospital/checklist/checklist-body/checklist-body-container'
import ChecklistPatientInfo from '@/components/hospital/checklist/common/checklist-patient-info'
import { getChecklistDataById } from '@/lib/services/checklist/get-checklist-data-client'
import type { ChecklistData } from '@/types/checklist/checklist-type'
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

export default async function ChecklistBody(props: {
  children: React.ReactNode
  params: Promise<{
    hos_id: string
    target_date: string
    checklist_id: string
  }>
}) {
  const params = await props.params
  const checklistdata: any = await getChecklistDataById(params.checklist_id)

  return (
    <div className="flex-col">
      <div className="m-3 text-xl font-bold">
        {checklistdata.checklist_title}
      </div>
      {checklistdata.patient_id ? (
        <ChecklistPatientInfo
          patientId={checklistdata.patient_id}
          checklistdata={checklistdata}
        />
      ) : (
        checklistdata && (
          <div className="m-3">
            {' '}
            <ChecklistRegisterDialog
              hosId={checklistdata.hos_id}
              checklistData={checklistdata}
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
                checklistdata.preinfo?.other &&
                '기관튜브(' + checklistdata.preinfo?.other.split('#')[0] + ')'}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <ChecklistBodyContainer checklistData={checklistdata as ChecklistData} />
    </div>
  )
}
