import Cage from '@/components/hospital/icu/main/chart/selected-chart/chart-body/chart-infos/cage/cage'
import ChiefComplaint from '@/components/hospital/icu/main/chart/selected-chart/chart-body/chart-infos/chief-complaint'
import CpcrEtTube from '@/components/hospital/icu/main/chart/selected-chart/chart-body/chart-infos/cpcr-et-tube/cpcr-et-tube'
import Diagnosis from '@/components/hospital/icu/main/chart/selected-chart/chart-body/chart-infos/diagnosis'
import Group from '@/components/hospital/icu/main/chart/selected-chart/chart-body/chart-infos/group/group'
import OwnerName from '@/components/hospital/icu/main/chart/selected-chart/chart-body/chart-infos/owner-name'
import Urgency from '@/components/hospital/icu/main/chart/selected-chart/chart-body/chart-infos/urgency/urgency'
import Vets from '@/components/hospital/icu/main/chart/selected-chart/chart-body/chart-infos/vets/vets'
import type { SelectedIcuChart } from '@/types/icu/chart'
import Indate from './in-and-out-date/indate'
import OutDate from './in-and-out-date/out-date'
import OutDueDate from './in-and-out-date/out-due-date'

export default function ChartInfos({
  chartData,
}: {
  chartData: SelectedIcuChart
}) {
  const {
    icu_io: {
      in_date,
      out_date,
      out_due_date,
      icu_io_dx,
      icu_io_cc,
      icu_io_id,
      cage,
      cpcr,
      group_list,
    },
    patient: { owner_name, patient_id },
    main_vet,
    sub_vet,
    icu_chart_id,
    in_charge,
    urgency,
  } = chartData

  const isPatientOut = out_date !== null

  return (
    <div className="grid grid-cols-6 gap-2">
      <div className="col-span-1">
        <Indate inDate={in_date} />
      </div>

      <div className="col-span-1">
        {isPatientOut ? (
          <OutDate outDate={out_date} />
        ) : (
          <OutDueDate
            outDueDate={out_due_date}
            icuIoId={icu_io_id}
            inDate={in_date}
          />
        )}
      </div>

      <div className="col-span-1">
        <OwnerName ownerName={owner_name ?? ''} patientId={patient_id} />
      </div>

      <div className="col-span-1">
        <CpcrEtTube cpcrEtTube={cpcr} icuIoId={icu_io_id} />
      </div>

      <div className="col-span-1">
        <Cage cage={cage ?? ''} icuIoId={icu_io_id} />
      </div>

      <div className="col-span-1">
        <Urgency urgency={urgency} icuChartId={icu_chart_id} />
      </div>

      <div className="col-span-3">
        <Vets
          mainVet={main_vet}
          subVet={sub_vet}
          icuChartId={icu_chart_id}
          inCharge={in_charge}
        />
      </div>

      <div className="col-span-3">
        <Group currentGroups={group_list} icuIoId={icu_io_id} />
      </div>

      <div className="col-span-3">
        <ChiefComplaint chiefComplaint={icu_io_cc} icuIoId={icu_io_id} />
      </div>

      <div className="col-span-3">
        <Diagnosis diagnosis={icu_io_dx} icuIoId={icu_io_id} />
      </div>
    </div>
  )
}
