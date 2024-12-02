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
import { DEFAULT_ICU_ORDER_TYPE } from '@/constants/hospital/icu/chart/order'
import { TIMES } from '@/constants/hospital/icu/chart/time'
import type { IcuTxTableData } from '@/types/icu/tx-table'
import { SquarePlus } from 'lucide-react'
import { useEffect, useMemo, useRef } from 'react'

export default function TxTable({
  localFilterState,
  filteredTxData,
  chartBackgroundMap,
}: {
  localFilterState: string
  filteredTxData: IcuTxTableData[]
  chartBackgroundMap: {
    [key: string]: string
  }
}) {
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const tableRef = useRef<HTMLTableElement>(null)

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const currentHour = new Date().getHours() - 5

      if (scrollAreaRef.current && tableRef.current) {
        const scrollContainer = scrollAreaRef.current.querySelector(
          '[data-radix-scroll-area-viewport]',
        ) as HTMLDivElement | null

        const headerCells = tableRef.current.querySelectorAll('th')

        let scrollPosition = 0
        let foundCurrentHour = false

        headerCells.forEach((cell, index) => {
          if (index === 0) return

          const hour = TIMES[index - 1]

          if (hour < currentHour) {
            scrollPosition += cell.offsetWidth
          } else if (hour === currentHour && !foundCurrentHour) {
            scrollPosition += cell.offsetWidth
            foundCurrentHour = true
          }
        })

        if (scrollContainer) {
          scrollContainer.style.scrollBehavior = 'smooth'
          scrollContainer.scrollLeft = scrollPosition
        }
      }
    }, 100)

    return () => clearTimeout(timeoutId)
  }, [filteredTxData])

  const orderType = useMemo(
    () =>
      DEFAULT_ICU_ORDER_TYPE.find(
        (orderType) => orderType.value === localFilterState,
      )?.label,
    [localFilterState],
  )

  if (filteredTxData.length === 0) {
    return (
      <NoResultSquirrel
        text={`모든 ${orderType ?? ''} 처치를 완료했습니다`}
        className="h-icu-chart-main flex-col"
        size="lg"
      />
    )
  }

  return (
    <ScrollArea
      ref={scrollAreaRef}
      className="h-[calc(100vh-136px)] overflow-scroll whitespace-nowrap md:h-icu-chart-main md:w-[calc(100vw-200px)]"
    >
      <Table className="border" ref={tableRef}>
        <TableHeader className="sticky top-0 z-10 bg-white shadow-sm">
          <TableRow>
            <TableHead className="w-[120px] text-center">환자목록</TableHead>

            {TIMES.map((time) => (
              <TableHead className="border text-center" key={time}>
                {time.toString().padStart(2, '0')}
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
                <TableCell className="sticky left-0 min-w-[120px] bg-white text-center shadow-md">
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
