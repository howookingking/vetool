'use client'

import React, { useEffect, useState } from 'react'
import {
  getEachTxChart,
  getEachTxChartReal,
  updateEachTxChart,
} from '@/lib/services/checklist/get-checklist-data-client'
import { type TxChart } from '@/types/checklist/txchart'
type Props = {
  checklistId: string
}
const ChecklistButtonDetail = ({ checklistId }: Props) => {
  const [txchart, setTxchart] = useState<TxChart | null>(null)
  const [timeLabel, setTimeLabel] = useState('')

  useEffect(() => {
    if (checklistId) {
      getchart(checklistId)

      const channel = getEachTxChartReal(checklistId, (data: TxChart) => {
        setTxchart(data)
        setlabeltxt(data)
      })
    }
  }, [checklistId])

  const setlabeltxt = (chart: TxChart) => {
    if (!chart.starttime) return

    const start = new Date(chart.starttime).toLocaleTimeString('ko-KR', {
      hour12: false,
    })
    const end = chart.endtime
      ? new Date(chart.endtime).toLocaleTimeString('ko-KR', {
          hour12: false,
        })
      : null

    if (start && end) {
      setTimeLabel(`(시작 : ${start} 종료 : ${end})`)
    } else if (start) {
      setTimeLabel(`(시작 : ${start})`)
    }
  }
  const getchart = async (checklist_id: string) => {
    const singlechart = await getEachTxChart(checklist_id, (data: TxChart) => {
      setTxchart(data)
      setlabeltxt(data)
    })
    // console.log(singlechart)
  }
  return (
    <div className="flex-col">
      <div className="mb-1 flex justify-between gap-2">
        <span className="max-w-[96px] truncate text-xs leading-5">
          {txchart && txchart.checklist_title}
        </span>
      </div>
      <div className="mb-1 flex justify-between gap-2">
        <span className="truncate text-xs leading-5">
          <span className="truncate text-xs leading-5">
            {txchart && txchart.due_date}
            {txchart && txchart.starttime && txchart && txchart.endtime
              ? '  완료'
              : txchart && txchart.starttime && !txchart && txchart.endtime
                ? '  진행중'
                : '  대기중'}
            {timeLabel}
          </span>
        </span>
      </div>
    </div>
  )
}

export default ChecklistButtonDetail
