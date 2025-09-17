// data type 바뀌면서 에러나는 부분 주석 처리

import NoResultSquirrel from '@/components/common/no-result-squirrel'
import ChecklistPatientInfo from '@/components/hospital/checklist/common/checklist-patient-info'
import ClRegisterDialog from '@/components/hospital/checklist/sidebar/checklist-register-dialog/cl-register-dialog'
import { fetchChecklistWithPatientWithWeight } from '@/lib/services/checklist/get-checklist-data-client'

export default async function ChecklistBody(props: {
  params: Promise<{
    hos_id: string
    target_date: string
    checklist_id: string
  }>
}) {
  const { checklist_id, hos_id, target_date } = await props.params
  const checklistData = await fetchChecklistWithPatientWithWeight(checklist_id)

  if (!checklistData) {
    return (
      <NoResultSquirrel
        text="체크리스트가 없습니다"
        className="mt-40 flex-col"
        size="lg"
      />
    )
  }

  return (
    <div className="flex-col">
      <h3 className="m-3 text-xl font-bold">{checklistData.checklist_title}</h3>

      {checklistData.patient ? (
        <ChecklistPatientInfo checklistData={checklistData} />
      ) : (
        <div className="m-3">
          <ClRegisterDialog
            hosId={hos_id}
            targetDate={target_date}
            // TODO:isEmergency관련 로직 컴포넌트 내부에서 수정해야함
            isEmergency
          />
        </div>
      )}

      {/* <Table className="m-3 w-[400px] border text-left text-sm text-gray-700">
        <TableBody>
          <TableRow className="transition-colors hover:bg-muted/20">
            <TableCell>시작시간</TableCell>
            <TableCell>
              {checklistData.start_time &&
                new Date(checklistData.start_time).toLocaleTimeString('ko-KR', {
                  hour12: false,
                })}
            </TableCell>
          </TableRow>
          <TableRow className="bg-muted/30 hover:bg-muted/40">
            <TableCell>종료시간</TableCell>
            <TableCell>
              {checklistData.end_time &&
                new Date(checklistData.end_time).toLocaleTimeString('ko-KR', {
                  hour12: false,
                })}
            </TableCell>
          </TableRow>
          <TableRow className="transition-colors hover:bg-muted/20">
            <TableCell>추가정보</TableCell>
            <TableCell>
              {checklistData.checklist_type === '응급' &&
              checklistData.pre_info?.other
                ? '기관튜브(' +
                  checklistData.pre_info?.other.split('#')[0] +
                  ')'
                : null}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table> */}
      {/* <ChecklistBodyContainer checklistData={checklistData} /> */}
    </div>
  )
}
