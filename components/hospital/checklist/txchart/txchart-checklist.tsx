'use client'
import {
  ChecklistResults,
  Checklistset,
  TxChart,
} from '@/types/checklist/checklistchart'
import { useEffect, useRef, useState } from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

import TxChartIntervalMin from './txchart-intervalmin'

import TxchartChecklistBasic from './txchart-checklist-basic'
import TxchartChecklistPreSet from './txchart-checklist-preset'
import TxchartChecklistTable from './txchart-checklist-table'
import TxchartProtocol from './txchart-protocol'
type Props = {
  checklistId: string
  txChart: TxChart | null
}
const TxchartChecklist = ({ checklistId, txChart }: Props) => {
  //   const [time, setTime] = useState<Number>(0)
  const [timeMin, setTimeMin] = useState<number>(0)

  useEffect(() => {}, [checklistId, txChart])
  const intermininputref = useRef<HTMLInputElement>(null)

  const setChecklistTimes = (intervaltime: String) => {
    setTimeMin(Number(intervaltime))
  }

  return (
    <Accordion
      type="single"
      collapsible
      className="w-full"
      defaultValue={'vet-info'}
    >
      <AccordionItem value="vet-info">
        <AccordionTrigger>체크리스트 및 치료과정</AccordionTrigger>
        <AccordionContent>
          {txChart?.starttime && (
            <div className="m-3 flex items-center text-lg font-bold">
              시작후
              <TxChartIntervalMin
                setedintervalmin={
                  txChart?.checklist_set?.interval
                    ? Number(txChart.checklist_set.interval)
                    : 0
                }
                startime={txChart?.starttime ?? null}
                setChecklistTimes={setChecklistTimes}
              ></TxChartIntervalMin>
            </div>
          )}
          <Tabs
            defaultValue="inputdata"
            className="w-[400px] sm:w-[800px] xl:w-full"
          >
            <TabsList>
              <TabsTrigger value="inputdata">입력</TabsTrigger>
              <TabsTrigger value="table">체크리스트</TabsTrigger>
              <TabsTrigger value="protocol">과정</TabsTrigger>
            </TabsList>
            <TabsContent value="inputdata">
              {/* 체크리스트 입력 */}

              <TxchartChecklistBasic
                txChart={txChart && txChart}
                timeMin={timeMin}
              ></TxchartChecklistBasic>
            </TabsContent>
            <TabsContent value="table" className="w-auto">
              <TxchartChecklistTable
                txChart={txChart && txChart}
                timeMin={timeMin}
              ></TxchartChecklistTable>
            </TabsContent>
            <TabsContent value="protocol">
              <TxchartProtocol
                txChart={txChart && txChart}
                timeMin={timeMin}
              ></TxchartProtocol>
            </TabsContent>

            {/* 테이블 */}
          </Tabs>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}

export default TxchartChecklist
