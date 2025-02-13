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
import { VITALS } from '@/constants/hospital/icu/chart/vital'
import { getVitalTxData } from '@/lib/services/icu/chart/vitals'
import type { VitalData } from '@/types/icu/chart'
import { LineChart, LoaderCircle } from 'lucide-react'
import dynamic from 'next/dynamic'
import { useState } from 'react'

const LazyVitalChart = dynamic(() => import('./vital-chart'), {
  ssr: false,
  loading: () => <LargeLoaderCircle />,
})

type Props = {
  patientId: string
  inDate: string
}

export default function VitalChartDialog({ patientId, inDate }: Props) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [currentVital, setCurrentVital] = useState('체중')
  const [isLoading, setIsLoading] = useState(false)
  const [vitalData, setVitalData] = useState<Record<string, VitalData[]>>({})

  const handleOpenChange = async (isDialogOpen: boolean) => {
    if (isDialogOpen) {
      setCurrentVital('체중')
      setIsLoading(true)
      const fetchedVitalData = await getVitalTxData(patientId, inDate)

      const groupedData = fetchedVitalData.reduce(
        (acc, item) => {
          const orderName = item.icu_chart_order_name

          const vitalName = VITALS.find((vital) =>
            orderName.includes(vital.title),
          )?.title

          if (!vitalName) return acc

          if (!acc[vitalName]) {
            acc[vitalName] = []
          }

          acc[vitalName].push(item)
          return acc
        },
        {} as Record<string, VitalData[]>,
      )

      setVitalData(groupedData)
      setIsLoading(false)
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
          {isLoading ? (
            <LoaderCircle className="animate-spin" />
          ) : (
            <LineChart size={18} />
          )}
        </Button>
      </DialogTrigger>

      <DialogContent className="flex h-[90vh] w-[95vw] max-w-[95vw]">
        <DialogTitle className="hidden" />
        <DialogDescription className="hidden" />

        <VitalChartSidebar
          currentVital={currentVital}
          setCurrentVital={setCurrentVital}
        />

        <LazyVitalChart
          currentVital={currentVital}
          inDate={inDate}
          vitalData={vitalData}
        />
      </DialogContent>
    </Dialog>
  )
}
