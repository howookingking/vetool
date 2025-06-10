'use client'
import { useEffect, useState } from 'react'

import { ChecklistSidebarData } from '@/types/checklist/checklistchart'
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

type Props = {
  checklistId: string
}

const TxChartMainContainer = ({ checklistId }: Props) => {
  const [time, setTime] = useState<Number>(getCurrentTime())
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(getCurrentTime())
    }, 1000)

    return () => clearInterval(interval)
  }, [checklistId])
  function getCurrentTime(): Number {
    const now = new Date()
    return now.getTime() // 24시간 형식
  }
  return (
    <div>
      <TxchartChecklist
        pretime={time}
        checklistId={checklistId}
      ></TxchartChecklist>
    </div>
  )
}

export default TxChartMainContainer
