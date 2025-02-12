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
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import { LineChart } from 'lucide-react'
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

  const handleOpenChange = (open: boolean) => {
    if (open) {
      setCurrentVital('체중')
    }
    setIsDialogOpen(open)
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
          <LineChart size={18} />
        </Button>
      </DialogTrigger>

      <DialogContent className="flex h-[90vh] w-[95vw] max-w-[95vw] gap-0 p-0">
        <VisuallyHidden>
          <DialogTitle />
          <DialogDescription />
        </VisuallyHidden>

        <VitalChartSidebar
          currentVital={currentVital}
          setCurrentVital={setCurrentVital}
        />

        <LazyVitalChart
          currentVital={currentVital}
          patientId={patientId}
          inDate={inDate}
        />
      </DialogContent>
    </Dialog>
  )
}
