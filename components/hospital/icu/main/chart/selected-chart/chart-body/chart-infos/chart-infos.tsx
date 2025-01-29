import Cage from '@/components/hospital/icu/main/chart/selected-chart/chart-body/chart-infos/cage/cage'
import ChiefComplaint from '@/components/hospital/icu/main/chart/selected-chart/chart-body/chart-infos/chief-complaint'
import CpcrEtTube from '@/components/hospital/icu/main/chart/selected-chart/chart-body/chart-infos/cpcr-et-tube/cpcr-et-tube'
import Diagnosis from '@/components/hospital/icu/main/chart/selected-chart/chart-body/chart-infos/diagnosis'
import Group from '@/components/hospital/icu/main/chart/selected-chart/chart-body/chart-infos/group/group'
import InAndOutDate from '@/components/hospital/icu/main/chart/selected-chart/chart-body/chart-infos/in-and-out-date/in-and-out-date'
import OwnerName from '@/components/hospital/icu/main/chart/selected-chart/chart-body/chart-infos/owner-name'
import Vets from '@/components/hospital/icu/main/chart/selected-chart/chart-body/chart-infos/vets/vets'
import Urgency from '@/components/hospital/icu/main/chart/selected-chart/chart-body/chart-infos/urgency/urgency'
import { type SelectedChart } from '@/types/icu/chart'

export default function ChartInfos({
  chartData,
}: {
  chartData: Omit<SelectedChart, 'orders'>
}) {
  const {
    icu_io,
    patient,
    main_vet,
    sub_vet,
    icu_chart_id,
    in_charge,
    urgency,
  } = chartData

  return (
    <div className="grid grid-cols-9 gap-2 md:grid-cols-12">
      <div className="col-span-6 md:col-span-4">
        <InAndOutDate
          icuIoId={icu_io.icu_io_id}
          inDate={icu_io.in_date}
          outDueDate={icu_io.out_due_date}
          outDate={icu_io.out_date}
        />
      </div>

      <div className="col-span-3 md:col-span-2">
        <OwnerName
          ownerName={patient.owner_name ?? ''}
          patientId={patient.patient_id}
        />
      </div>

      <div className="col-span-3 md:col-span-2">
        <CpcrEtTube cpcrEtTube={icu_io.cpcr} icuIoId={icu_io.icu_io_id} />
      </div>

      <div className="col-span-3 md:order-none md:col-span-2">
        <Cage cage={icu_io.cage ?? ''} icuIoId={icu_io.icu_io_id} />
      </div>

      <div className="col-span-3 md:order-none md:col-span-2">
        <Urgency urgency={urgency} icuChartId={icu_chart_id} />
      </div>

      <div className="order-last col-span-9 md:order-none md:col-span-6">
        <Vets
          mainVet={main_vet}
          subVet={sub_vet}
          icuChartId={icu_chart_id}
          inCharge={in_charge}
        />
      </div>

      <div className="col-span-9 md:order-none md:col-span-6">
        <Group currentGroups={icu_io.group_list} icuIoId={icu_io.icu_io_id} />
      </div>

      <div className="order-last col-span-9 md:order-none md:col-span-6">
        <ChiefComplaint
          chiefComplaint={icu_io.icu_io_cc}
          icuIoId={icu_io.icu_io_id}
        />
      </div>
      <div className="order-last col-span-9 md:order-none md:col-span-6">
        <Diagnosis diagnosis={icu_io.icu_io_dx} icuIoId={icu_io.icu_io_id} />
      </div>
    </div>
  )
}
