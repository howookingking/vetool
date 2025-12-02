import PatientDetailInfo from '@/components/hospital/common/patient/patient-detail-info'
import { Table } from '@/components/ui/table'
import useLocalStorage from '@/hooks/use-local-storage'
import type { OrderWidth } from '@/types/hospital/order'
import type { SelectedIcuChart } from '@/types/icu/chart'
import ReadOnlyChartInfos from './read-only-chart-infos'
import ReadOnlyChartTableBody from './read-only-chart-table-body'
import ReadOnlyChartTableHeader from './read-only-chart-table-header'

type Props = {
  chartData: SelectedIcuChart
  ref?: React.RefObject<HTMLDivElement | null>
}

export default function ReadOnlyIcuChart({ chartData, ref }: Props) {
  const { patient, weight, weight_measured_date } = chartData
  const [orderWidth, setOrderWidth] = useLocalStorage<OrderWidth>(
    'orderWidth',
    400,
  )

  return (
    <div ref={ref} className="flex w-[1400px] flex-col gap-2 p-2 ring">
      <div className="mx-auto my-1 font-bold">
        <PatientDetailInfo
          species={patient.species}
          name={patient.name}
          breed={patient.breed}
          gender={patient.gender}
          birth={patient.birth}
          weight={weight}
          weightMeasuredDate={weight_measured_date}
        />
      </div>

      <ReadOnlyChartInfos chartData={chartData} />

      <Table className="border">
        <ReadOnlyChartTableHeader
          orderWidth={orderWidth}
          setOrderWidth={setOrderWidth}
        />

        <ReadOnlyChartTableBody chartData={chartData} orderWidth={orderWidth} />
      </Table>
    </div>
  )
}
