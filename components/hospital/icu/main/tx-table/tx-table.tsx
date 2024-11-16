'use client'

import NoResult from '@/components/common/no-result'
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
import { cn } from '@/lib/utils/utils'
import { useBasicHosDataContext } from '@/providers/basic-hos-data-context-provider'
import type { IcuTxTableData } from '@/types/icu/tx-table'

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

  return (
    <ScrollArea className="h-[calc(100vh-136px)] overflow-scroll whitespace-nowrap md:h-icu-chart-main md:w-[calc(100vw-200px)]">
      <Table className="border">
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

                  <div className="text-xs">{txData.icu_charts.weight}kg</div>
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
