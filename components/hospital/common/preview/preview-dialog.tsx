import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { Spinner } from '@/components/ui/spinner'
import { getIcuChartByPatientIdAndTargetDate } from '@/lib/services/icu/chart/get-icu-chart'
import { getTemplateChart } from '@/lib/services/icu/template/template'
import { useCopiedChartStore } from '@/lib/store/icu/copied-chart'
import { cn } from '@/lib/utils/utils'
import { EyeIcon } from 'lucide-react'
import { useState } from 'react'
import PreviewDialogContent from './preview-dialog-content'

type Props =
  | {
      isTemplate: true // template의 경우는 chartId는 있지만 patientId는 없다
      chartId: string
      targetDate: null
      patientId: null
      className?: string
    }
  | {
      isTemplate: false
      chartId: string
      targetDate: string
      patientId: string
      className?: string
    }

export default function PreviewDialog({
  targetDate,
  isTemplate,
  patientId,
  chartId,
  className,
}: Props) {
  const { copiedChart, setCopiedChart } = useCopiedChartStore()

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleOpenChange = async (open: boolean) => {
    if (open) {
      setIsLoading(true)

      const chartData = isTemplate
        ? await getTemplateChart(chartId)
        : await getIcuChartByPatientIdAndTargetDate(targetDate, patientId)

      setCopiedChart(chartData!)

      setIsDialogOpen(true)
      setIsLoading(false)
    } else {
      setIsDialogOpen(false)
    }
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button
          size="icon"
          variant="ghost"
          disabled={isLoading}
          className={cn('mx-auto flex items-center justify-center', className)}
        >
          {isLoading ? <Spinner /> : <EyeIcon />}
        </Button>
      </DialogTrigger>

      <PreviewDialogContent copiedChart={copiedChart!} />
    </Dialog>
  )
}
