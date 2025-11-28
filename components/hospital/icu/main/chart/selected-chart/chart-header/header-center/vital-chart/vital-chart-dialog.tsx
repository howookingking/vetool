'use client'

import VitalChartSidebar from '@/components/hospital/icu/main/chart/selected-chart/chart-header/header-center/vital-chart/vital-chart-sidebar'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Spinner } from '@/components/ui/spinner'
import type { ChartableVital } from '@/constants/hospital/icu/chart/vital-chart'
import { fetchChartableVitalsData } from '@/lib/services/icu/chart/vitals'
import type { VitalData } from '@/types/icu/chart'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import { LineChart } from 'lucide-react'
import { useState } from 'react'
import VitalChart from './vital-chart'

type Props = {
  icuIoId: string
  inDate: string
}

export default function VitalChartDialog({ icuIoId, inDate }: Props) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedVital, setSelectedVital] = useState<ChartableVital>('체중')
  const [isFetching, setIsFetching] = useState(false)
  const [chartableVitals, setChartableVitals] = useState<
    Record<string, VitalData[]>
  >({})
  const [displayCount, setDisplayCount] = useState(10)

  const handleOpenChange = async (isDialogOpen: boolean) => {
    if (isDialogOpen) {
      setIsFetching(true)

      // { '체중': [...], '체온': [...], '혈압': [...], ... }
      const fetchedVitalData = await fetchChartableVitalsData(icuIoId)
      setChartableVitals(fetchedVitalData)

      setIsFetching(false)
    }
    setIsDialogOpen(isDialogOpen)
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="hidden shrink-0 md:flex"
          data-guide="vital-chart"
          disabled={isFetching}
        >
          {isFetching ? <Spinner /> : <LineChart />}
        </Button>
      </DialogTrigger>

      <DialogContent className="flex h-[90vh] w-[95vw] max-w-[95vw] gap-0 p-0">
        <VisuallyHidden>
          <DialogTitle />
          <DialogDescription />
        </VisuallyHidden>

        <VitalChartSidebar
          currentVital={selectedVital}
          setCurrentVital={setSelectedVital}
          setDisplayCount={setDisplayCount}
        />

        <VitalChart
          selectedVital={selectedVital}
          inDate={inDate}
          chartableVitals={chartableVitals}
          displayCount={displayCount}
          setDisplayCount={setDisplayCount}
        />
      </DialogContent>
    </Dialog>
  )
}
