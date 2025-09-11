import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea'
import { checkListSetArray } from '@/constants/checklist/checklist'
import { getPatientById } from '@/lib/services/checklist/get-checklist-data-client'
import { calculateAge } from '@/lib/utils/utils'
import {
  CheckItem,
  ChecklistData,
  ChecklistResults,
  ReportPatient,
  TemplateChecklist,
  TimeTable,
} from '@/types/checklist/checklist-type'
import { PatientDataTable } from '@/types/patients'
import { set } from 'date-fns'
import { toast } from '@/components/ui/use-toast'
import { useEffect, useState } from 'react'

export default function ChecklistReportTxtDialogButton({
  checklistData,
  prepatient,
}: {
  checklistData: ChecklistData
  prepatient: ReportPatient
}) {
  const [isPreviewDialogOpen, setIsPreviewDialogOpen] = useState(false)
  const [txt, setTxt] = useState('')
  const [resultTxt, setResultTxt] = useState('')
  useEffect(() => {
    if (!checklistData) return
    let pretxt = ''
    pretxt = pretxt + '< 체크리스트 리포트 >' + '\n'
    pretxt = pretxt + '1.제목: ' + checklistData.checklist_title + '\n'
    pretxt = pretxt + '2.날짜: ' + checklistData.due_date + '\n'
    pretxt =
      pretxt +
      '3.환자정보: ' +
      prepatient.name +
      '(' +
      prepatient.hos_patient_id +
      ') ' +
      prepatient.species +
      ' ' +
      prepatient.breed +
      ' ' +
      prepatient.gender +
      ' ' +
      calculateAge(prepatient.birth ?? '') +
      ' ' +
      checklistData.weight +
      'kg' +
      '\n'
    pretxt = pretxt + '4.수의사정보 ' + '\n'
    pretxt =
      pretxt +
      '   담당의(주치의): ' +
      checklistData?.checklist_vet?.attending +
      '\n'
    checklistData.checklist_vet?.anesthesia &&
      (pretxt =
        pretxt +
        '   마취의: ' +
        checklistData?.checklist_vet?.anesthesia +
        '\n')
    pretxt =
      pretxt + '   어시스트: ' + checklistData?.checklist_vet?.assistance + '\n'
    pretxt = pretxt + '5. 처치정보 ' + '\n'
    checklistData.preinfo?.pre &&
      (pretxt = pretxt + '- 전처치: \n' + checklistData.preinfo.pre + '\n')
    checklistData.preinfo?.induce &&
      (pretxt =
        pretxt + '- 유도마취: \n ' + checklistData.preinfo.induce + '\n')
    checklistData.preinfo?.main &&
      (pretxt = pretxt + '- 주요처치: \n ' + checklistData.preinfo.main + '\n')
    checklistData.preinfo?.post &&
      (pretxt = pretxt + '- 후처치: \n ' + checklistData.preinfo.post + '\n')
    checklistData.checklist_set &&
      checklistData.checklist_set.result &&
      (pretxt =
        pretxt +
        '6.체크리스트: \n' +
        makeresulttxt(checklistData.checklist_set.result))
    checklistData.checklist_timetable &&
      checklistData.checklist_timetable.length > 0 &&
      (pretxt =
        pretxt +
        '7.기록사항: \n' +
        maketimetxt(checklistData.checklist_timetable, checklistData))

    pretxt = pretxt + '8.종합소견: \n'
    pretxt = pretxt + checklistData.comment + '\n'
    setTxt(pretxt)
  }, [checklistData])

  const makeresulttxt = (result: Record<string, ChecklistResults>) => {
    const predata: Record<string, number[]> = {}
    checkListSetArray.map((list: CheckItem) => {
      list.type === 'range' && (predata[list.name] = [])
    })
    result &&
      Object.keys(result).map((key) => {
        result[key] &&
          Object.keys(result[key]).map((name) => {
            result[key][name] &&
              predata[name] &&
              predata[name].push(Number(result[key][name]))
          })
      })
    const postdata: Record<string, string[]> = {} //평균,최소,최대
    checkListSetArray.map((list: CheckItem) => {
      list.type === 'range' && (postdata[list.name] = [])
    })
    predata &&
      Object.keys(predata).map((name) => {
        predata[name] &&
          predata[name].length > 0 &&
          postdata[name] &&
          postdata[name].push(
            String(
              predata[name].reduce((a, b) => a + b) / predata[name].length,
            ),
          )
        predata[name] &&
          predata[name].length > 0 &&
          postdata[name] &&
          postdata[name].push(String(Math.min(...predata[name])))
        predata[name] &&
          predata[name].length > 0 &&
          postdata[name] &&
          postdata[name].push(String(Math.max(...predata[name])))
      })
    let preresulttxt = ''
    postdata &&
      Object.keys(postdata).map((name) => {
        postdata[name] &&
          postdata[name].length > 0 &&
          (preresulttxt =
            preresulttxt +
            name +
            ' : ' +
            postdata[name][1] +
            ' ~ ' +
            postdata[name][2] +
            '(평균값: ' +
            postdata[name][0] +
            ')' +
            '\n')
      })
    return preresulttxt
  }

  const maketimetxt = (timetable: TimeTable, checklistdata: ChecklistData) => {
    type Time = {
      time?: null | number
      txt?: null | string
      type?: null | string
      imgurl?: null | string
    }
    let pretimetxt = ''
    pretimetxt =
      '(+0 : ' +
      new Date(checklistdata.starttime ?? 0).toLocaleTimeString() +
      ') ' +
      checklistdata.checklist_title +
      ' 시작 ' +
      '\n'

    checklistdata.starttime &&
      timetable.map((table: Time) => {
        const timetext =
          table.time &&
          table.time !== 0 &&
          Math.floor(
            (table.time - new Date(checklistdata.starttime ?? 0).getTime()) /
              (60 * 1000),
          ) +
            ' : ' +
            new Date(table.time ?? 0).toLocaleTimeString()
        pretimetxt = pretimetxt + '(+' + timetext + ')' + table.txt + '\n'
      })
    const endtimetxt =
      checklistdata.endtime && checklistdata.starttime
        ? Math.floor(
            (new Date(checklistdata?.endtime).getTime() -
              new Date(checklistdata?.starttime).getTime()) /
              (60 * 1000),
          )
        : ''
    pretimetxt =
      pretimetxt +
      '(+' +
      +String(endtimetxt) +
      ' : ' +
      new Date(checklistdata.endtime ?? 0).toLocaleTimeString() +
      ')' +
      checklistdata.checklist_title +
      ' 종료 ' +
      '\n'

    return pretimetxt
  }

  const copyclipboard = async () => {
    try {
      await navigator.clipboard.writeText(txt.trim())
      toast({
        title: '클립보드에 복사되었습니다',
      })
      setIsPreviewDialogOpen(false)
      // 성공 처리 (토스트 등)
    } catch (err) {
      // 실패 시 대안(fallback) 또는 에러 처리
      console.error('클립보드 복사 실패:', err)
    }
  }
  return (
    <>
      <Button
        size="sm"
        variant={'outline'}
        onClick={() => setIsPreviewDialogOpen(true)}
      >
        TXT
      </Button>
      <Dialog open={isPreviewDialogOpen} onOpenChange={setIsPreviewDialogOpen}>
        <DialogContent className="sm:min-w-[400px]">
          <DialogHeader>
            <DialogTitle className="m-3">
              {'체크리스트 리포트(TXT)'}
            </DialogTitle>
          </DialogHeader>
          <Button
            size="sm"
            variant={'outline'}
            className="w-[200px]"
            onClick={() => {
              copyclipboard()
            }}
          >
            클립 보드로 복사
          </Button>
          <Textarea
            value={txt}
            onChange={(e) => setTxt(e.target.value)}
            className="min-h-[40vh]"
          ></Textarea>
        </DialogContent>
      </Dialog>
    </>
  )
}
