'use client'

import { Button } from '@/components/ui/button'
import type {
  ChecklistData,
  ReportPatient,
} from '@/types/checklist/checklist-type'
import { Image } from 'lucide-react'
import ChecklistReport from '@/components/hospital/checklist/checklist-report/checklist-report'
import ChecklistReportTxtDialogButton from './checklist-repost-txt-dialog-button'
import { useEffect, useState } from 'react'
import { getPatientById } from '@/lib/services/checklist/get-checklist-data-client'

type Props = {
  checklistData: ChecklistData
}

const nonpatient: ReportPatient = {
  patient_id: '',
  name: '',
  species: '',
  breed: '',
  gender: '',
  birth: '',
  hos_patient_id: '',
}
export default function ChecklistReportMain({ checklistData }: Props) {
  const [patient, setPatient] = useState<ReportPatient | null>(null)
  useEffect(() => {
    const fetchData = async () => {
      if (checklistData.patient_id) {
        const pdata = await getPatientById(checklistData.patient_id)
        if (pdata) setPatient(pdata as ReportPatient)
      }
    }
    fetchData()
  })
  return (
    <div>
      <div className="felx-wrap m-3 flex w-[250px] items-center rounded border border-gray-300 p-2">
        <div className="mr-2">내보내기</div>
        <Button className="mr-2" size="sm" variant={'outline'}>
          <Image />
        </Button>
        <Button size="sm" className="mr-2" variant={'outline'}>
          PDF
        </Button>
        <ChecklistReportTxtDialogButton
          checklistData={checklistData}
          prepatient={patient ?? nonpatient}
        />
      </div>
      <div>
        <ChecklistReport checklistData={checklistData} />
      </div>
    </div>
  )
}
