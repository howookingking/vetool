'use client'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { updateEachChecklist } from '@/lib/services/checklist/get-checklist-data-client'
import { ChecklistData } from '@/types/checklist/checklist-type'
import { Pencil } from 'lucide-react'
import { useState } from 'react'
import { format } from 'date-fns'
import ChecklistTimeEditor from './checklist-time-editor'
type Props = {
  checklistData: ChecklistData
}

export default function ChecklistStartEndTimeSet({ checklistData }: Props) {
  const [isStartEndDialogOpen, setStartEndDialogOpen] = useState(false)
  const [isStartDialogOpen, setStartDialogOpen] = useState(false)

  const endCancelBtn = () => {
    if (checklistData) {
      const predata = { ...checklistData }
      predata.endtime = null
      predata.istxing = true
      predata.enddate = null
      updateEachChecklist(predata)
    }
  }
  const startCancelBtn = () => {
    if (checklistData) {
      const predata = { ...checklistData }
      predata.starttime = null
      predata.endtime = null
      predata.istxing = false
      updateEachChecklist(predata)
    }
  }
  const startBtn = () => {
    if (checklistData) {
      const predata = { ...checklistData }
      predata.starttime = new Date().toISOString()
      predata.istxing = true
      updateEachChecklist(predata)
    }
  }
  const endBtn = () => {
    if (checklistData) {
      const predata = { ...checklistData }
      predata.endtime = new Date().toISOString()
      predata.istxing = false
      predata.enddate = format(new Date(), 'yyyy-MM-dd')
      updateEachChecklist(predata)
    }
  }
  const changeMainTime = (date: Date, timename: string) => {
    if (checklistData) {
      if (timename === 'starttime') {
        const predata = { ...checklistData }
        predata.starttime = new Date(date).toISOString()
        updateEachChecklist(predata)
        setStartEndDialogOpen(false)
        setStartDialogOpen(false)
      } else {
        const predata = { ...checklistData }
        predata.endtime = new Date(date).toISOString()
        updateEachChecklist(predata)
        setStartEndDialogOpen(false)
      }
    }
  }
  return (
    <div className="flex flex-wrap">
      {checklistData?.starttime && checklistData?.endtime ? (
        <div className="flex items-center">
          <div>
            <Button className="m-3" variant="outline" onClick={endCancelBtn}>
              종료 취소
            </Button>
          </div>
          <div>
            <Dialog
              open={isStartEndDialogOpen}
              onOpenChange={setStartEndDialogOpen}
            >
              <DialogTrigger asChild>
                <Button className="m-3" variant="outline">
                  <Pencil />
                </Button>
              </DialogTrigger>

              <DialogContent>
                <DialogHeader>
                  <DialogTitle>시작 시간변경</DialogTitle>
                </DialogHeader>
                <ChecklistTimeEditor
                  pretime={checklistData?.starttime}
                  setTime={changeMainTime}
                  timename="starttime"
                />
                <DialogHeader>
                  <DialogTitle>종료 시간변경</DialogTitle>
                </DialogHeader>
                <ChecklistTimeEditor
                  pretime={checklistData?.endtime}
                  setTime={changeMainTime}
                  timename="endtime"
                />
              </DialogContent>
            </Dialog>
          </div>
        </div>
      ) : checklistData?.starttime && !checklistData.endtime ? (
        <div className="flex items-center">
          <div>
            <Button className="m-3" variant="outline" onClick={startCancelBtn}>
              시작 취소
            </Button>
          </div>
          <div>
            <Button className="m-3" variant="outline" onClick={endBtn}>
              종료
            </Button>
          </div>
          <div>
            <Dialog open={isStartDialogOpen} onOpenChange={setStartDialogOpen}>
              <DialogTrigger asChild>
                <Button className="m-3" variant="outline">
                  <Pencil />
                </Button>
              </DialogTrigger>

              <DialogContent>
                <DialogHeader>
                  <DialogTitle>시작 시간변경</DialogTitle>
                </DialogHeader>
                <ChecklistTimeEditor
                  pretime={checklistData?.starttime}
                  setTime={changeMainTime}
                  timename="starttime"
                />
              </DialogContent>
            </Dialog>
          </div>
        </div>
      ) : (
        <Button
          className="m-3"
          type="button"
          variant="outline"
          onClick={startBtn}
        >
          시작
        </Button>
      )}
    </div>
  )
}
