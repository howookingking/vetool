'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { updateEachChecklist } from '@/lib/services/checklist/get-checklist-data-client'
import { ChecklistData } from '@/types/checklist/checklist-type'
import { Camera, Image } from 'lucide-react'
import { useRef } from 'react'
import { toast } from '@/components/ui/use-toast'
import useIsMobile from '@/hooks/use-is-mobile'
type Props = {
  checklistData: ChecklistData
}
export default function ChecklistTimetableAdd({ checklistData }: Props) {
  const inputTxt = useRef<HTMLInputElement>(null)
  const isMobile = useIsMobile()
  const addtimetableTx = () => {
    if (inputTxt.current && inputTxt.current.value) {
      const txt = inputTxt.current.value
      const predata = { ...checklistData } as any
      if (!predata.checklist_timetable) {
        predata.checklist_timetable = []
        predata.checklist_timetable.push({
          time: new Date().getTime(),
          txt: txt,
          type: 'txt',
          imgurl: null,
        })
        updateEachChecklist(predata)
          .then(() => {
            if (inputTxt.current) {
              inputTxt.current.value = ''
            }
          })
          .catch((error) => {
            console.error('Error saving checklistChart:', error)
            toast({
              title: '오류',
              description: '저장에 실패했습니다.',
            })
          })
      } else {
        predata.checklist_timetable = [...predata.checklist_timetable]
        predata.checklist_timetable.push({
          time: new Date().getTime(),
          txt: txt,
          type: 'txt',
          imgurl: null,
        })
        updateEachChecklist(predata)
          .then(() => {
            if (inputTxt.current) {
              inputTxt.current.value = ''
            }
          })
          .catch((error) => {
            console.error('Error saving checklistChart:', error)
            toast({
              title: '오류',
              description: '저장에 실패했습니다.',
            })
          })
      }
    }
  }
  return (
    <div className="m-3 flex items-center">
      {isMobile ? <div>+</div> : <div>기록 추가</div>}
      <Input className="ml-3 w-[250px]" ref={inputTxt}></Input>
      <Button variant="outline" className="ml-1" onClick={addtimetableTx}>
        +
      </Button>
      <Button variant="outline" className="ml-3">
        {' '}
        <Camera />
      </Button>
      <Button variant="outline" className="ml-3">
        <Image />
      </Button>
    </div>
  )
}
