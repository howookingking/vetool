'use client'

import NoResultSquirrel from '@/components/common/no-result-squirrel'
import PatientInfo from '@/components/hospital/common/patient-info'
import TxTableCell from '@/components/hospital/icu/main/tx-table/tx-table-cell'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { toast } from '@/components/ui/use-toast'
import { DEFAULT_ICU_ORDER_TYPE } from '@/constants/hospital/icu/chart/order'
import { TIMES } from '@/constants/hospital/icu/chart/time'
import type { IcuTxTableData } from '@/types/icu/tx-table'
import { SquarePlus } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'
import TimeTxTextCopy from './time-tx-text-copy'

export default function TxTable({
  localFilterState,
  filteredTxData,
  chartBackgroundMap,
}: {
  localFilterState: string
  filteredTxData: IcuTxTableData[]
  chartBackgroundMap: Record<string, string>
}) {
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const tableRef = useRef<HTMLTableElement>(null)
  const [isScrolled, setIsScrolled] = useState(false)

  const getCurrentScrollPosition = () => {
    const currentHour = new Date().getHours() - 5
    if (!tableRef.current) return 0
    const headerCells = Array.from(tableRef.current.querySelectorAll('th'))
    return headerCells.slice(1, currentHour + 1).reduce((total, cell) => {
      return total + cell.offsetWidth
    }, 0)
  }

  useEffect(() => {
    const scrollToCurrentTime = () => {
      const scrollContainer = scrollAreaRef.current?.querySelector(
        '[data-radix-scroll-area-viewport]',
      ) as HTMLDivElement | null

      if (scrollContainer) {
        const scrollPosition = getCurrentScrollPosition()
        scrollContainer.style.scrollBehavior = 'smooth'
        scrollContainer.scrollLeft = scrollPosition
      }
    }

    const timeoutId = setTimeout(() => {
      if (!isScrolled) {
        setIsScrolled(true)
        scrollToCurrentTime()
      }
    }, 100)

    return () => clearTimeout(timeoutId)
  }, [filteredTxData, isScrolled])

  const orderType = DEFAULT_ICU_ORDER_TYPE.find(
    (orderType) => orderType.value === localFilterState,
  )?.label

  if (filteredTxData.length === 0) {
    return (
      <NoResultSquirrel
        text={`모든 ${orderType ?? ''} 처치를 완료했습니다`}
        className="h-icu-chart-main flex-col"
        size="lg"
      />
    )
  }

  const [copiedTxTime, setCopiedTxTime] = useState<number | null>()
  const handleTimeTxTextCopy = useCallback(
    (time: number) => {
      const title = `${time}시 ${DEFAULT_ICU_ORDER_TYPE.find((order) => order.value === localFilterState)?.label ?? '전체'} 처치`

      const filteredTimeTxData = filteredTxData
        .map((data) => ({
          ...data,
          orders: data.orders.filter(
            (order) => order.icu_chart_order_time[time - 1] !== '0',
          ),
        }))
        .filter((data) => data.orders.length > 0)

      let text = `‼️${title}\n\n`

      filteredTimeTxData.forEach((data) => {
        text += `${data.patient.species === 'canine' ? '🐶' : '🐱'} ${data.patient.name}(${data.patient.breed}) - ${data.icu_charts.weight}kg\n`
        data.orders.forEach(
          (order) =>
            (text += `✅ ${order.icu_chart_order_name}, ${order.icu_chart_order_comment} \n`),
        )
        text += '\n'
      })

      navigator.clipboard.writeText(text.trim())
      setCopiedTxTime(time)
      toast({
        title: `클립보드에 ${title}를 복사하였습니다`,
      })
    },
    [filteredTxData, localFilterState],
  )

  return (
    <ScrollArea
      ref={scrollAreaRef}
      className="h-[calc(100vh-136px)] overflow-scroll whitespace-nowrap md:h-icu-chart-main md:w-[calc(100vw-250px)]"
    >
      <Table className="border" ref={tableRef}>
        <TableHeader className="sticky top-0 z-10 bg-white shadow-sm">
          <TableRow>
            <TableHead className="w-[120px] text-center">환자목록</TableHead>

            {TIMES.map((time) => (
              <TableHead className="border text-center" key={time}>
                <div className="flex items-center justify-center">
                  <span>{time.toString().padStart(2, '0')}</span>
                  <TimeTxTextCopy
                    handleClick={() => handleTimeTxTextCopy(time)}
                    isCopied={copiedTxTime === time}
                  />
                </div>
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody>
          {filteredTxData.flatMap((txData) =>
            txData.orders.map((order) => (
              <TableRow
                key={order.icu_chart_order_id}
                style={{
                  background:
                    chartBackgroundMap[txData.icu_charts.icu_chart_id],
                }}
                className="divide-x"
              >
                <TableCell className="sticky left-0 bg-white text-center shadow-md">
                  <PatientInfo
                    name={txData.patient.name}
                    breed={txData.patient.breed}
                    species={txData.patient.species}
                    iconSize={18}
                    col
                  />

                  <div className="flex flex-col justify-center gap-1">
                    <span className="text-xs">
                      {txData.icu_charts.weight}kg
                    </span>

                    {txData.icu_io.cage && (
                      <div className="flex items-center justify-center gap-1 text-muted-foreground">
                        <SquarePlus size={12} />
                        <span className="text-xs">{txData.icu_io.cage}</span>
                      </div>
                    )}
                  </div>
                </TableCell>

                {TIMES.map((time) => (
                  <TxTableCell
                    patientName={txData.patient.name}
                    key={time}
                    time={time}
                    order={order}
                    patientId={txData.patient_id}
                  />
                ))}
              </TableRow>
            )),
          )}
        </TableBody>
      </Table>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  )
}
