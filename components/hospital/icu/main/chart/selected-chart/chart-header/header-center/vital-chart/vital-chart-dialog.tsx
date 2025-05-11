'use client'

import LargeLoaderCircle from '@/components/common/large-loader-circle'
import VitalChartSidebar from '@/components/hospital/icu/main/chart/selected-chart/chart-header/header-center/vital-chart/vital-chart-sidebar'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import type { ChartableVital } from '@/constants/hospital/icu/chart/vital-chart'
import { fetchChartableVitalsData } from '@/lib/services/icu/chart/vitals'
import type { VitalData } from '@/types/icu/chart'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import { LineChart, LoaderCircle } from 'lucide-react'
import dynamic from 'next/dynamic'
import { useState } from 'react'

const LazyVitalChart = dynamic(() => import('./vital-chart'), {
  ssr: false,
  loading: () => <LargeLoaderCircle />,
})

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
        >
          {isFetching ? (
            <LoaderCircle className="animate-spin" />
          ) : (
            <LineChart size={18} />
          )}
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
        />

        <LazyVitalChart
          selectedVital={selectedVital}
          inDate={inDate}
          chartableVitals={chartableVitals}
        />
      </DialogContent>
    </Dialog>
  )
}
