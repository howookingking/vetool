'use client'

import ChiefComplaint from '@/components/hospital/icu/main/chart/selected-chart/chart-body/chart-infos/chief-complaint'
import Diagnosis from '@/components/hospital/icu/main/chart/selected-chart/chart-body/chart-infos/diagnosis'
import InAndOutDate from '@/components/hospital/icu/main/chart/selected-chart/chart-body/chart-infos/in-and-out-date/in-and-out-date'
import VetName from '@/components/hospital/icu/main/chart/selected-chart/chart-body/chart-infos/vets/vet-name'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import type { SelectedIcuChart } from '@/types/icu/chart'

export default function IcuShareChartInfos({
  chartData,
}: {
  chartData: SelectedIcuChart
}) {
  const { icu_io, patient, main_vet } = chartData

  return (
    <div
      data-guide="chart-info"
      className="pointer-events-none grid cursor-not-allowed grid-cols-8 gap-2 md:grid-cols-11"
    >
      <div className="col-span-8 md:col-span-6">
        <InAndOutDate
          icuIoId={icu_io.icu_io_id}
          inDate={icu_io.in_date}
          outDueDate={icu_io.out_due_date}
          outDate={icu_io.out_date}
        />
      </div>

      <div className="order-last col-span-8 md:order-none md:col-span-5">
        <Diagnosis
          diagnosis={icu_io.icu_io_dx}
          icuIoId={icu_io.icu_io_id}
          isShare
        />
      </div>

      <div className="col-span-4 md:order-none md:col-span-3">
        <Button
          variant="outline"
          size="default"
          className="flex w-full justify-start gap-2 px-2"
        >
          <VetName label="주치의" name={main_vet.name ?? '미선택'} />
        </Button>
      </div>

      <div className="col-span-4 md:col-span-3">
        <Button
          variant="outline"
          size="default"
          className="relative flex w-full justify-start gap-2 overflow-hidden px-2"
        >
          <Label className="text-xs text-muted-foreground" htmlFor="ownerName">
            보호자
          </Label>

          <span id="ownerName" className="flex h-9 w-full items-center">
            {patient.owner_name ?? '미등록'}
          </span>
        </Button>
      </div>

      <div className="order-last col-span-8 md:order-none md:col-span-5">
        <ChiefComplaint
          chiefComplaint={icu_io.icu_io_cc}
          icuIoId={icu_io.icu_io_id}
          isShare
        />
      </div>
    </div>
  )
}
