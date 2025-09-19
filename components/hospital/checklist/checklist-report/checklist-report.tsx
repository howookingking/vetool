import ChecklistReportChecklist from '@/components/hospital/checklist/checklist-report/checklist-report-checklist'
import ChecklistReportTimetable from '@/components/hospital/checklist/checklist-report/checklist-report-timetable'
import ChecklistReportTxInfo from '@/components/hospital/checklist/checklist-report/checklist-report-txinfo'
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table'
import { getPatientById } from '@/lib/services/checklist/checklist-data'
import { calculateAge } from '@/lib/utils/utils'
import type { ChecklistData } from '@/types/checklist/checklist-type'
import { useEffect, useState } from 'react'

type Props = {
  checklistData: ChecklistData
}
export default function ChecklistReport({ checklistData }: Props) {
  const [patient, setPatient] = useState<any | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      if (checklistData.patient_id) {
        const pdata = await getPatientById(checklistData.patient_id)
        if (pdata) setPatient(pdata)
      }
    }
    fetchData()
  })
  return (
    <div className="flex-1 overflow-y-auto p-6">
      <div className="fle-wrap flex items-center">
        <div className="m-5 text-2xl font-bold">
          {checklistData?.checklist_title}
        </div>
      </div>
      <div className="fle-wrap flex items-center">
        <div className="mb-3 ml-5 text-lg font-bold">날짜 :</div>
        <div className="mb-3 text-lg font-bold">{checklistData?.due_date}</div>
      </div>
      <div className="mb-3 ml-5 text-base">1.환자정보</div>
      {patient ? (
        <Table className="m-5 w-[95%] min-w-[600px] border border-gray-300 text-center text-sm">
          <TableBody>
            <TableRow>
              <TableCell className="border-b border-gray-300 bg-gray-100 px-4 py-2 font-semibold text-gray-800">
                환자명(ID)
              </TableCell>
              <TableCell className="border-b border-gray-200 bg-white px-4 py-2 font-medium text-blue-700">
                {patient?.name}({patient?.hos_patient_id})
              </TableCell>
              <TableCell className="border-b border-gray-300 bg-gray-100 px-4 py-2 font-semibold text-gray-800">
                종(species)/품종(breed)
              </TableCell>
              <TableCell className="border-b border-gray-200 bg-white px-4 py-2 font-medium text-blue-700">
                {patient?.species?.toUpperCase()}/{patient?.breed}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="border-b border-gray-300 bg-gray-100 px-4 py-2 font-semibold text-gray-800">
                성별/체중
              </TableCell>
              <TableCell className="border-b border-gray-200 bg-white px-4 py-2 font-medium text-blue-700">
                {patient?.gender?.toUpperCase()}
                {' / '}
                {checklistData?.weight}kg
              </TableCell>
              <TableCell className="border-b border-gray-300 bg-gray-100 px-4 py-2 font-semibold text-gray-800">
                생년월일(연령)
              </TableCell>
              <TableCell className="border-b border-gray-200 bg-white px-4 py-2 font-medium text-blue-700">
                {patient?.birth}(
                {patient?.birth && calculateAge(patient?.birth)})
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      ) : (
        <div>환자정보가 없습니다</div>
      )}
      <div className="mb-3 ml-5 text-base">2.수의사 정보</div>
      <Table className="m-5 w-[95%] min-w-[600px] border border-gray-300 text-center text-sm">
        <TableBody>
          <TableRow>
            <TableCell className="max-w-[30px] border-b border-gray-300 bg-gray-100 px-4 py-2 font-semibold text-gray-800">
              담당의(주치의)
            </TableCell>
            <TableCell className="border-b border-gray-200 bg-white px-4 py-2 font-medium text-blue-700">
              {checklistData?.checklist_vet?.attending}
            </TableCell>
            {checklistData?.checklist_vet?.anesthesia && (
              <>
                <TableCell className="max-w-[30px] border-b border-gray-300 bg-gray-100 px-4 py-2 font-semibold text-gray-800">
                  마취수의사
                </TableCell>
                <TableCell className="border-b border-gray-200 bg-white px-4 py-2 font-medium text-blue-700">
                  {checklistData?.checklist_vet?.anesthesia}
                </TableCell>
              </>
            )}
          </TableRow>
          <TableRow>
            <TableCell className="max-w-[30px] border-b border-gray-300 bg-gray-100 px-4 py-2 font-semibold text-gray-800">
              어시스트
            </TableCell>
            <TableCell className="border-b border-gray-200 bg-white px-4 py-2 font-medium text-blue-700">
              {checklistData?.checklist_vet?.assistance}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <ChecklistReportTxInfo checklistData={checklistData} />
      <ChecklistReportTimetable checklistData={checklistData} />
      <ChecklistReportChecklist checklistData={checklistData} />
      {checklistData?.comment && (
        <div className="mb-10">
          <div className="ml-5 text-base">6.종합소견</div>

          <div className="borer-grey-300 m-3 ml-5 w-[95%] whitespace-pre rounded border p-3">
            {checklistData?.comment}
          </div>
        </div>
      )}
    </div>
  )
}
