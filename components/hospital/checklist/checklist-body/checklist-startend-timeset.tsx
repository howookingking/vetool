'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  type ChecklistWithPatientWithWeight,
  updateEachChecklist,
} from '@/lib/services/checklist/get-checklist-data-client'
import { format } from 'date-fns'
import { Pencil } from 'lucide-react'
import { useState } from 'react'
import ChecklistTimeEditor from './checklist-time-editor'

type Props = {
  checklistData: ChecklistWithPatientWithWeight
}

export default function ChecklistStartEndTimeSet({ checklistData }: Props) {
  const [isStartEndDialogOpen, setStartEndDialogOpen] = useState(false)
  const [isStartDialogOpen, setStartDialogOpen] = useState(false)

  const endCancelBtn = () => {
    if (checklistData) {
      const predata = { ...checklistData }
      predata.end_time = null
      predata.is_txing = true
      predata.end_date = null
      updateEachChecklist(predata)
    }
  }
  const startCancelBtn = () => {
    if (checklistData) {
      const predata = { ...checklistData }
      predata.start_time = null
      predata.end_time = null
      predata.is_txing = false
      updateEachChecklist(predata)
    }
  }
  const handleStart = () => {
    const predata = { ...checklistData }
    predata.start_time = new Date().toISOString()
    predata.is_txing = true

    updateEachChecklist(predata)
  }

  const handleEnd = () => {
    const predata = { ...checklistData }
    predata.end_time = new Date().toISOString()
    predata.is_txing = false
    predata.end_date = format(new Date(), 'yyyy-MM-dd')

    updateEachChecklist(predata)
  }

  const changeMainTime = (date: Date, timename: string) => {
    if (timename === 'start_time') {
      const predata = { ...checklistData }
      predata.start_time = new Date(date).toISOString()
      updateEachChecklist(predata)
      setStartEndDialogOpen(false)
      setStartDialogOpen(false)
    } else {
      const predata = { ...checklistData }
      predata.end_time = new Date(date).toISOString()
      updateEachChecklist(predata)
      setStartEndDialogOpen(false)
    }
  }
  return (
    <div className="flex flex-wrap">
      {checklistData?.start_time && checklistData?.end_time ? (
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
                  pretime={checklistData?.start_time}
                  setTime={changeMainTime}
                  timename="start_time"
                />
                <DialogHeader>
                  <DialogTitle>종료 시간변경</DialogTitle>
                </DialogHeader>
                <ChecklistTimeEditor
                  pretime={checklistData?.end_time}
                  setTime={changeMainTime}
                  timename="end_time"
                />
              </DialogContent>
            </Dialog>
          </div>
        </div>
      ) : checklistData?.start_time && !checklistData.end_time ? (
        <div className="flex items-center">
          <div>
            <Button className="m-3" variant="outline" onClick={startCancelBtn}>
              시작 취소
            </Button>
          </div>
          <div>
            <Button className="m-3" variant="outline" onClick={handleEnd}>
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
                  pretime={checklistData?.start_time}
                  setTime={changeMainTime}
                  timename="start_time"
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
          onClick={handleStart}
        >
          시작
        </Button>
      )}
    </div>
  )
}
