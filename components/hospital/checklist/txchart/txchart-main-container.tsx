'use client'
import { useEffect, useState } from 'react'

import { ChecklistSidebarData, TxChart } from '@/types/checklist/checklistchart'
import React from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
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
type Props = {
  checklistId: string
  txchartdata: ChecklistSidebarData
}

const TxChartMainContainer = ({ checklistId, txchartdata }: Props) => {
  const [txchart, setTxChart] = useState<TxChart | null>()
  const [sttime, setStTime] = useState<number | null>()

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
      updateEachTxChart(predata)
    }
  }
  const startCancelBtn = () => {
    if (txchart) {
      const predata = { ...txchart }
      predata.starttime = null
      predata.endtime = null
      updateEachTxChart(predata)
    }
  }
  const endBtn = () => {
    if (txchart) {
      const predata = { ...txchart }
      predata.endtime = new Date().toISOString()
      updateEachTxChart(predata)
    }
  }
  const endCancelBtn = () => {
    if (txchart) {
      const predata = { ...txchart }
      predata.endtime = null
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
              <Button
                className="m-3"
                type="button"
                variant="outline"
                onClick={endCancelBtn}
              >
                종료 취소
              </Button>
            ) : txchart?.starttime && !txchart.endtime ? (
              <Button
                className="m-3"
                type="button"
                variant="outline"
                onClick={startCancelBtn}
              >
                시작 취소
              </Button>
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
          <Pencil></Pencil>를 클릭하여 치료차트에 대한 세부 정보를 작성 해
          주세요
        </div>
      )}
    </div>
  )
}

export default TxChartMainContainer
