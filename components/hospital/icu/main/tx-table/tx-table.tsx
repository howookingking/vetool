import TxTableHeader from '@/components/hospital/icu/main/tx-table/tx-table-header'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { Table, TableBody } from '@/components/ui/table'
import type { OrderType } from '@/constants/hospital/icu/chart/order'
import { useIcuTxStore } from '@/lib/store/icu/icu-tx'
import { useBasicHosDataContext } from '@/providers/basic-hos-data-context-provider'
import type { SelectedTreatment } from '@/types/icu/chart'
import type { IcuTxTableData } from '@/types/icu/tx-table'
import { isToday } from 'date-fns'
import { useEffect, useRef } from 'react'
import TxUpsertDialog from '../chart/selected-chart/chart-body/table/tx/tx-upsert-dialog'
import TxTableRow from './tx-table-row'

type Props = {
  orderTypeFilter: OrderType | null
  filteredTxData: IcuTxTableData[]
  hosId: string
  targetDate: string
}

export default function TxTable({
  orderTypeFilter,
  filteredTxData,
  hosId,
  targetDate,
}: Props) {
  const isTargetDateToday = isToday(targetDate)

  const {
    basicHosData: { showTxUser, orderColorsData },
  } = useBasicHosDataContext()
  const { setTxStep, setTxLocalState } = useIcuTxStore()

  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const tableRef = useRef<HTMLTableElement>(null)

  const getCurrentScrollPosition = () => {
    const currentHour = new Date().getHours() - 3 // 3칸은 앞에 두는게 좋음
    if (!tableRef.current) return 0
    if (currentHour <= 5) return 0
    const headerCells = Array.from(tableRef.current.querySelectorAll('th'))
    return headerCells
      .slice(1, currentHour + 1)
      .reduce((total, cell) => total + cell.offsetWidth, 0)
  }

  useEffect(() => {
    const scrollToCurrentTime = () => {
      const scrollContainer = scrollAreaRef.current?.querySelector(
        '[data-radix-scroll-area-viewport]',
      )

      if (scrollContainer && isTargetDateToday) {
        const scrollPosition = getCurrentScrollPosition()
        scrollContainer.scrollLeft = scrollPosition
      }
    }

    const timeoutId = setTimeout(() => scrollToCurrentTime(), 100)

    return () => clearTimeout(timeoutId)
  }, [isTargetDateToday])

  const handleOpenTxDetail = (
    order: IcuTxTableData['orders'][number],
    time: number,
    treatment?: SelectedTreatment,
  ) => {
    setTxLocalState({
      icuChartOrderId: order.icu_chart_order_id,
      icuChartOrderType: order.icu_chart_order_type,
      icuChartOrderName: order.icu_chart_order_name,
      txResult: treatment?.icu_chart_tx_result,
      txComment: treatment?.icu_chart_tx_comment,
      txId: treatment?.icu_chart_tx_id,
      time,
      txLog: treatment?.tx_log,
      isCrucialChecked: treatment?.is_crucial,
    })

    setTxStep('detailInsert')
  }

  return (
    <>
      <ScrollArea
        ref={scrollAreaRef}
        className="h-full overflow-scroll whitespace-nowrap 2xl:w-[calc(100vw-232px)]"
      >
        <Table className="border border-l-0 border-t-0" ref={tableRef}>
          <TxTableHeader
            filteredTxData={filteredTxData}
            orderTypeFilter={orderTypeFilter}
            isTargetDateToday={isTargetDateToday}
          />

          <TableBody>
            {filteredTxData.map((txData, i) =>
              txData.orders.map((order, j) => {
                const orderLength = txData.orders.length
                const isLastOrder = j === orderLength - 1
                return (
                  <TxTableRow
                    key={order.icu_chart_order_id}
                    txData={txData}
                    order={order}
                    hosId={hosId}
                    targetDate={targetDate}
                    bgColor={
                      TX_TABLE_BACKGROUD_COLORS[
                        i % TX_TABLE_BACKGROUD_COLORS.length
                      ]
                    }
                    orderLength={orderLength}
                    j={j}
                    isLastOrder={isLastOrder}
                    orderColorsData={orderColorsData}
                    handleOpenTxDetail={handleOpenTxDetail}
                  />
                )
              }),
            )}
          </TableBody>
        </Table>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>

      <TxUpsertDialog showTxUser={showTxUser} />
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
// const orderType = orderTypeFilter.map(
//   (orderType) =>
//     DEFAULT_ICU_ORDER_TYPE.find((type) => type.value === orderType)?.label,
// )
