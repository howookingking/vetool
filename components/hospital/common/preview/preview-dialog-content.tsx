import ReadOnlyChartTable from '@/components/common/read-only-icu-chart/read-only-chart-table'
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import type { SelectedIcuChart } from '@/types/icu/chart'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import { format } from 'date-fns'
import PatientDetailInfo from '../patient/patient-detail-info'

type Props = {
  copiedChart: SelectedIcuChart
  isTemplate: boolean
}

export default function PreviewDialogContent({
  copiedChart,
  isTemplate,
}: Props) {
  const { patient, weight, weight_measured_date } = copiedChart

  return (
    <DialogContent className="sm:min-w-[1600px]">
      <DialogHeader>
        <DialogTitle>
          {isTemplate ? (
            '템플릿 미리보기'
          ) : (
            <span className="font-mono">
              {format(copiedChart.target_date!, 'yy.MM.dd')}
            </span>
          )}
        </DialogTitle>
        <VisuallyHidden>
          <DialogDescription />
        </VisuallyHidden>
        {!isTemplate && (
          <PatientDetailInfo
            className="text-muted-foreground"
            birth={patient.birth}
            breed={patient.breed}
            gender={patient.gender}
            isAlive={patient.is_alive}
            name={patient.name}
            species={patient.species}
            weight={weight}
            weightMeasuredDate={weight_measured_date}
          />
        )}
      </DialogHeader>

      <div className="max-h-[800px] overflow-y-auto">
        <ReadOnlyChartTable chartData={copiedChart} />
      </div>
    </DialogContent>
  )
}
