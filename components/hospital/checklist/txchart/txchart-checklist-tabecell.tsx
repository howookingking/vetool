import { Input } from '@/components/ui/input'
import { saveTxChart } from '@/lib/services/checklist/get-checklist-data'
import React, { use, useEffect, useState } from 'react'

type Props = {
  time: string
  name: string
  txChart?: any | null
}
const TxchartChecklistTabecell = ({ time, name, txChart }: Props) => {
  const [result, setResult] = useState<string>('')
  useEffect(() => {
    if (txChart) {
      txChart.checklist_set?.result &&
        txChart.checklist_set.result[time] &&
        setResult(txChart.checklist_set.result[time][name] || '')
    }
  }, [txChart])
  const savetxChart = async () => {
    if (txChart) {
      const predata = { ...txChart }
      //   if (!predata.checklist_set) {
      //     predata.checklist_set = { result: {} }
      //     if (!predata.checklist_set.result) {
      //       predata.checklist_set.result = {}
      //       if (!predata.checklist_set.result[time]) {
      //         predata.checklist_set.result[time] = {}
      //         predata.checklist_set.result[time][name] = result
      //         await saveTxChart(predata)
      //       }
      //     }
      //   } else {
      //     if (!predata.checklist_set.result) {
      //       predata.checklist_set.result = {}
      //       if (!predata.checklist_set.result[time]) {
      //         predata.checklist_set.result[time] = {}
      //         predata.checklist_set.result[time][name] = result
      //         await saveTxChart(predata)
      //       } else {
      //         predata.checklist_set.result[time][name] = result
      //         await saveTxChart(predata)
      //       }
      //     } else {
      //       if (!predata.checklist_set.result[time]) {
      //         predata.checklist_set.result[time] = {}
      //         predata.checklist_set.result[time][name] = result
      //         await saveTxChart(predata)
      //       } else {
      //         predata.checklist_set.result[time][name] = result
      //         await saveTxChart(predata)
      //       }
      //     }
      //   }
      predata.checklist_set ??= { result: {} }
      predata.checklist_set.result ??= {}
      predata.checklist_set.result[time] ??= {}
      predata.checklist_set.result[time][name] = result

      await saveTxChart(predata)
    } else {
      console.error('txChart is null or undefined')
    }
  }
  return (
    <div>
      <Input
        value={result ?? ''}
        onBlur={savetxChart}
        onChange={(e) => setResult(String(e.target.value))}
      ></Input>
    </div>
  )
}

export default TxchartChecklistTabecell
