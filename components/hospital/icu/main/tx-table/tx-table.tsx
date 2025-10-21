'use client'

import PatientBriefInfo from '@/components/hospital/common/patient/patient-brief-info'
import TxTableCell from '@/components/hospital/icu/main/tx-table/tx-table-cell'
import TxTableHeader from '@/components/hospital/icu/main/tx-table/tx-table-header'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table'
import { TIMES } from '@/constants/hospital/icu/chart/time'
import { useIcuTxStore } from '@/lib/store/icu/icu-tx'
import type { IcuOrderColors } from '@/types/adimin'
import type { Species } from '@/types/hospital/calculator'
import type { TxLog } from '@/types/icu/chart'
import type { IcuTxTableData } from '@/types/icu/tx-table'
import { SquarePlus } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import TxUpsertDialogDynamc from '../chart/selected-chart/chart-body/table/tx/tx-upsert-dialog-dynamic'

type Props = {
  orderTypeFilters: string[]
  filteredTxData: IcuTxTableData[]
  showTxUser: boolean
  orderColorsData: IcuOrderColors
}

export default function TxTable({
  orderTypeFilters,
  filteredTxData,
  showTxUser,
  orderColorsData,
}: Props) {
  const { hos_id, target_date } = useParams()
  const { push } = useRouter()

  const { setTxStep, setTxLocalState } = useIcuTxStore()

  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const tableRef = useRef<HTMLTableElement>(null)

  const [isScrolled, setIsScrolled] = useState(false)

  const getCurrentScrollPosition = () => {
    const currentHour = new Date().getHours() - 5
    if (!tableRef.current) return 0
    if (currentHour <= 5) return 0
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
  }, [isScrolled])

  const handleMoveToChart = (
    patientId: string,
    time: number,
    order: IcuTxTableData['orders'][number],
  ) => {
    push(
      `/hospital/${hos_id}/icu/${target_date}/chart/${patientId}?order-id=${order.icu_chart_order_id}&time=${time}`,
    )
  }

  const handleOpenTxDetail = (
    order: IcuTxTableData['orders'][number],
    time: number,
    treatment?: IcuTxTableData['orders'][number]['treatments'][number],
  ) => {
    setTxLocalState({
      icuChartOrderId: order.icu_chart_order_id,
      icuChartOrderType: order.icu_chart_order_type,
      icuChartOrderName: order.icu_chart_order_name,
      txResult: treatment?.tx_result,
      txComment: treatment?.tx_comment,
      txId: treatment?.tx_id,
      time,
      txLog: treatment?.tx_log as TxLog[] | null,
      isCrucialChecked: treatment?.is_crucial,
    })
    setTxStep('detailInsert')
  }

  return (
    <>
      <ScrollArea
        ref={scrollAreaRef}
        className="h-mobile overflow-scroll whitespace-nowrap 2xl:w-[calc(100vw-250px)]"
      >
        <Table className="border border-l-0" ref={tableRef}>
          <TxTableHeader
            filteredTxData={filteredTxData}
            orderTypeFilters={orderTypeFilters}
          />

          <TableBody>
            {filteredTxData.flatMap((txData, index) =>
              txData.orders.map((order) => (
                <TableRow
                  key={order.icu_chart_order_id}
                  style={{
                    background:
                      TX_TABLE_BACKGROUD_COLORS[
                        index % TX_TABLE_BACKGROUD_COLORS.length
                      ],
                  }}
                  className="divide-x"
                >
                  <TableCell className="sticky left-0 z-20 bg-white text-center shadow-md">
                    <PatientBriefInfo
                      name={txData.patient.name}
                      breed={txData.patient.breed}
                      species={txData.patient.species as Species}
                      iconSize={18}
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

                  {TIMES.map((time) => {
                    // 해당시간에 스케쥴된 오더가 아닌경우 빈 셀로 처리
                    const isOrderScheduled =
                      order.icu_chart_order_time[time] !== '0'
                    if (!isOrderScheduled) return <TableCell key={time} />

                    // 해당시간에 스케쥴된 오더가 있고, 처치가 완료된 경우 빈 셀로 처리
                    const isTxCompleted = order.treatments.some(
                      (tx) => tx.time === time && tx.tx_result,
                    )
                    if (isTxCompleted) return <TableCell key={time} />

                    const treatment = order.treatments.find(
                      (tx) => tx.time === time,
                    )

                    return (
                      <TxTableCell
                        patientName={txData.patient.name}
                        key={time}
                        time={time}
                        order={order}
                        treatment={treatment}
                        patientId={txData.patient_id}
                        orderColorsData={orderColorsData}
                        handleClickMove={handleMoveToChart}
                        handleOpenTxDetail={handleOpenTxDetail}
                      />
                    )
                  })}
                </TableRow>
              )),
            )}
          </TableBody>
        </Table>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>

      <TxUpsertDialogDynamc showTxUser={showTxUser} />
    </>
  )
}

const TX_TABLE_BACKGROUD_COLORS = [
  '#fef2f2',
  '#fffbeb',
  '#f7fee7',
  '#ecfdf5',
  '#ecfeff',
  '#eff6ff',
  '#f5f3ff',
  '#fdf4ff',
  '#fff1f2',
  '#fff7ed',
  '#fefce8',
  '#f0fdf4',
  '#f0fdfa',
  '#e0f2fe',
  '#f0f9ff',
  '#eef2ff',
  '#faf5ff',
  '#fdf2f8',
] as const

// 사이드바 필터 적용 비활성화
// const orderType = orderTypeFilters.map(
//   (orderType) =>
//     DEFAULT_ICU_ORDER_TYPE.find((type) => type.value === orderType)?.label,
// )
