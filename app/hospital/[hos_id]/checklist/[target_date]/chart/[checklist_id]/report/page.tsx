import type { ChecklistData } from '@/types/checklist/checklist-type'
import { cn } from '@/lib/utils/utils'
import ChecklistReportMain from '@/components/hospital/checklist/checklist-report/checklist-report-main'

export default async function ReportPage(props: {
  params: Promise<{
    hos_id: string
    target_date: string
    checklist_id: string
  }>
}) {
  const params = await props.params
  // const checklistdata: any = await getChecklistDataById(params.checklist_id)

  return null
  // <div>
  //   {checklistdata?.checklist_id &&
  //   checklistdata?.starttime &&
  //   checklistdata?.endtime ? (
  //     <ChecklistReportMain checklistData={checklistdata} />
  //   ) : (
  //     <div
  //       className={cn(
  //         'flex items-center justify-center gap-2 text-sm text-slate-800',
  //         'lg',
  //         'h-screen',
  //       )}
  //     >
  //       과정이 종료되야 리포트를 출력할 수 있습니다.
  //     </div>
  //   )}
  // </div>
}
