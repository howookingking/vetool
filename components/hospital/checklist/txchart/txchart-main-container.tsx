'use client'
import { useEffect, useState } from 'react'

import { ChecklistSidebarData, TxChart } from '@/types/checklist/checklistchart'
import React from 'react'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import TxchartChecklist from './txchart-checklist'
import { Button } from '@/components/ui/button'
import {
  getEachTxChart,
  getEachTxChartReal,
  updateEachTxChart,
} from '@/lib/services/checklist/get-checklist-data-client'
import { updateBaselineTime } from '@/lib/services/admin/icu/baseline-time'
import GeneralClock from '../common/generalclock'
import TxChartInformation from './txchart-information'
import TxchartStatusTxt from './txchart-statustxt'
import { Pencil } from 'lucide-react'
import { cn } from '@/lib/utils/utils'
import { format } from 'date-fns'
import TxChartEditorTxtime from './txchart-editor-txtime'
type Props = {
  checklistId: string
  txchartdata: ChecklistSidebarData
}

const TxChartMainContainer = ({ checklistId, txchartdata }: Props) => {
  const [txchart, setTxChart] = useState<TxChart | null>()
  const [sttime, setStTime] = useState<number | null>()
  const [isStartEndDialogOpen, setStartEndDialogOpen] = useState(false)
  const [isStartDialogOpen, setStartDialogOpen] = useState(false)

  useEffect(() => {
    checklistId && getchart(checklistId)
    const channel = getEachTxChartReal(checklistId, (data: TxChart) => {
      setTxChart(data)
    })

    return () => {
      channel.then((c) => c.unsubscribe())
    }
  }, [checklistId, txchartdata])
  const getchart = async (checklist_id: string) => {
    const singlechart = await getEachTxChart(checklist_id, (data: TxChart) => {
      setTxChart(data)
      data.starttime && setStTime(new Date(data.starttime).getTime())
    })
    // console.log(singlechart)
  }
  //   const getrealchart = async (checklist_id: string) => {
  //     const singlechart = await getEachTxChartReal(
  //       checklist_id,
  //       (data: TxChart) => {
  //         setTxChart(data)
  //       },
  //     )
  //     // console.log(singlechart)
  //   }
  const startBtn = () => {
    if (txchart) {
      const predata = { ...txchart }
      predata.starttime = new Date().toISOString()
      predata.istxing = true
      updateEachTxChart(predata)
    }
  }
  const startCancelBtn = () => {
    if (txchart) {
      const predata = { ...txchart }
      predata.starttime = null
      predata.endtime = null
      predata.istxing = false
      updateEachTxChart(predata)
    }
  }
  const endBtn = () => {
    if (txchart) {
      const predata = { ...txchart }
      predata.endtime = new Date().toISOString()
      predata.istxing = false
      predata.enddate = format(new Date(), 'yyyy-MM-dd')
      updateEachTxChart(predata)
    }
  }
  const endCancelBtn = () => {
    if (txchart) {
      const predata = { ...txchart }
      predata.endtime = null
      predata.istxing = true
      predata.enddate = null
      updateEachTxChart(predata)
    }
  }
  const timeInterval = (timetz1: string, timetz2: string) => {
    const date1 = new Date(timetz1)
    const date2 = new Date(timetz2)
    const diffMs = date2.getTime() - date1.getTime()
    const diffMinutes = Math.floor(diffMs / (1000 * 60)) // 분
    const hr = Math.floor(diffMinutes / 60)
    const disphr = hr > 0 ? hr : null
    const min = diffMinutes % 60
    return [diffMinutes, disphr, min]
  }
  const changeMainTime = (date: Date, timename: string) => {
    if (txchart) {
      if (timename === 'starttime') {
        const predata = { ...txchart }
        predata.starttime = new Date(date).toISOString()
        updateEachTxChart(predata)
        setStartEndDialogOpen(false)
        setStartDialogOpen(false)
      } else {
        const predata = { ...txchart }
        predata.endtime = new Date(date).toISOString()
        updateEachTxChart(predata)
        setStartEndDialogOpen(false)
      }
    }
  }
  return (
    <div>
      {txchart?.checklist_type && txchart?.checklist_title ? (
        <div>
          <div className="fle-wrap flex items-center">
            <div className="m-5 text-xl font-bold">
              {txchart?.checklist_title}
            </div>
            <GeneralClock></GeneralClock>
          </div>
          <TxchartStatusTxt
            txChart={txchart ? txchart : null}
          ></TxchartStatusTxt>
          <div className="m-3">
            <TxChartInformation
              txchartdata={txchart ? txchart : null}
            ></TxChartInformation>
          </div>
          <div className="flex flex-wrap">
            {txchart?.starttime && txchart?.endtime ? (
              <div className="flex items-center">
                <div>
                  <Button
                    className="m-3"
                    variant="outline"
                    onClick={endCancelBtn}
                  >
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
                      <TxChartEditorTxtime
                        pretime={txchart?.starttime}
                        setTime={changeMainTime}
                        timename="starttime"
                      ></TxChartEditorTxtime>
                      <DialogHeader>
                        <DialogTitle>종료 시간변경</DialogTitle>
                      </DialogHeader>
                      <TxChartEditorTxtime
                        pretime={txchart?.endtime}
                        setTime={changeMainTime}
                        timename="endtime"
                      ></TxChartEditorTxtime>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            ) : txchart?.starttime && !txchart.endtime ? (
              <div className="flex items-center">
                <div>
                  <Button
                    className="m-3"
                    variant="outline"
                    onClick={startCancelBtn}
                  >
                    시작 취소
                  </Button>
                </div>
                <div>
                  <Button className="m-3" variant="outline" onClick={endBtn}>
                    종료
                  </Button>
                </div>
                <div>
                  <Dialog
                    open={isStartDialogOpen}
                    onOpenChange={setStartDialogOpen}
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
                      <TxChartEditorTxtime
                        pretime={txchart?.starttime}
                        setTime={changeMainTime}
                        timename="starttime"
                      ></TxChartEditorTxtime>
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
                치료 시작
              </Button>
            )}
          </div>
          <div className="m-3">
            <TxchartChecklist
              txChart={txchart ? txchart : null}
              checklistId={checklistId}
            ></TxchartChecklist>
          </div>
        </div>
      ) : (
        <div
          className={cn(
            'flex items-center justify-center gap-2 text-sm text-slate-800',
            'lg',
            'h-screen',
          )}
        >
          <Pencil />를 클릭하여 치료차트에 대한 세부 정보를 작성 해 주세요
        </div>
      )}
    </div>
  )
}

export default TxChartMainContainer
