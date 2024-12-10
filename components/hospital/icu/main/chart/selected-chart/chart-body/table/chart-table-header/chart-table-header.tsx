import { TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { TIMES } from '@/constants/hospital/icu/chart/time'
import type { SelectedChart, SelectedIcuOrder } from '@/types/icu/chart'
import { Dispatch, SetStateAction } from 'react'
import OrderWidthButton from '../order-width-button'
import OrderDialog from '../order/order-dialog'
import SortingButton from '../sorting-button'

export default function ChartTableHeader({
  preview,
  chartData,
  sortedOrders,
  isSorting,
  setIsSorting,
  hosId,
  showOrderer,
  orderStep,
  reset,
  isEditOrderMode,
  setOrderStep,
  isExport,
  setSortedOrders,
  orderWidth,
  setOrderWidth,
}: {
  preview?: boolean
  chartData: SelectedChart
  sortedOrders: SelectedIcuOrder[]
  isSorting: boolean
  setIsSorting: Dispatch<SetStateAction<boolean>>
  hosId: string
  showOrderer: boolean
  orderStep: 'closed' | 'upsert' | 'selectOrderer' | 'multipleEdit'
  reset: () => void
  isEditOrderMode?: boolean
  setOrderStep: (
    orderStep: 'closed' | 'upsert' | 'selectOrderer' | 'multipleEdit',
  ) => void
  isExport?: boolean
  setSortedOrders: Dispatch<SetStateAction<SelectedIcuOrder[]>>
  orderWidth: number
  setOrderWidth: Dispatch<SetStateAction<number>>
}) {
  const {
    icu_chart_id,
    orders,
    patient,
    weight,
    main_vet,
    der_calc_factor,
    icu_io: { age_in_days },
  } = chartData

  return (
    <TableHeader className="sticky -top-3 z-20 bg-white shadow-sm">
      <TableRow>
        <TableHead className="flex items-center justify-between px-0.5 text-center">
          {!preview && (
            <SortingButton
              chartData={chartData}
              sortedOrders={sortedOrders}
              isSorting={isSorting}
              setIsSorting={setIsSorting}
            />
          )}

          <span className="w-full text-center">오더 목록</span>

          {!preview && !isSorting && (
            <>
              <OrderDialog
                hosId={hosId}
                icuChartId={icu_chart_id}
                orders={orders}
                showOrderer={showOrderer}
                patient={patient}
                weight={weight}
                ageInDays={age_in_days}
                orderStep={orderStep}
                reset={reset}
                isEditOrderMode={isEditOrderMode}
                setOrderStep={setOrderStep}
                isExport={isExport}
                setSortedOrders={setSortedOrders}
                mainVetName={main_vet.name}
                derCalcFactor={der_calc_factor}
              />
            </>
          )}

          {!isSorting && (
            <OrderWidthButton
              orderWidth={orderWidth}
              setOrderWidth={setOrderWidth}
            />
          )}
        </TableHead>

        {TIMES.map((time) => (
          <TableHead className="border text-center" key={time}>
            {time.toString().padStart(2, '0')}
          </TableHead>
        ))}
      </TableRow>
    </TableHeader>
  )
}