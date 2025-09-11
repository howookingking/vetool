'use client'

import { Button } from '@/components/ui/button'
import type {
  ChecklistData,
  ReportPatient,
} from '@/types/checklist/checklist-type'
import ChecklistReport from '@/components/hospital/checklist/checklist-report/checklist-report'
import ChecklistReportTxtDialogButton from './checklist-repost-txt-dialog-button'
import { useEffect, useRef, useState } from 'react'
import { getPatientById } from '@/lib/services/checklist/get-checklist-data-client'
import html2canvas from 'html2canvas'
import { Image, LoaderCircle } from 'lucide-react'
import { cn } from '@/lib/utils/utils'
import { toast } from '@/components/ui/use-toast'
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
  const [isExporting, setIsExporting] = useState(false)
  useEffect(() => {
    const fetchData = async () => {
      if (checklistData.patient_id) {
        const pdata = await getPatientById(checklistData.patient_id)
        if (pdata) setPatient(pdata as ReportPatient)
      }
    }
    fetchData()
  })
  const reportRef = useRef<HTMLDivElement>(null)

  const handleExportPng = async () => {
    if (!reportRef.current) return toast.error('캡쳐할 영역이 없습니다.')

    try {
      setIsExporting(true)
      await (document as any).fonts?.ready?.catch(() => {})
      const canvas = await html2canvas(reportRef.current, {
        backgroundColor: '#ffffff',
        useCORS: true,
        scale: 2,
      })

      const dataUrl = canvas.toDataURL('image/png')
      const a = document.createElement('a')
      a.href = dataUrl
      a.download = `report-${Date.now()}.png`
      a.click()

      toast({
        title: '이미지(PNG) 다운로드를 시작합니다.',
      })
    } catch (e) {
      console.error(e)
      toast({
        title: '이미지(PNG) 다운로드 실패',
      })
    } finally {
      setIsExporting(false)
    }
  }
  return (
    <div>
      <div className="felx-wrap m-3 flex w-[250px] items-center rounded border border-gray-300 p-2">
        <div className="mr-2">내보내기</div>
        <Button
          className="mr-2"
          size="sm"
          variant={'outline'}
          disabled={isExporting}
          onClick={handleExportPng}
        >
          <Image />{' '}
          <LoaderCircle
            className={cn(isExporting ? 'ml-2 animate-spin' : 'hidden')}
          />
        </Button>
        {/* <Button size="sm" className="mr-2" variant={'outline'}>
          PDF
        </Button> */}
        <ChecklistReportTxtDialogButton
          checklistData={checklistData}
          prepatient={patient ?? nonpatient}
        />
      </div>
      <div ref={reportRef}>
        <ChecklistReport checklistData={checklistData} />
      </div>
    </div>
  )
}
