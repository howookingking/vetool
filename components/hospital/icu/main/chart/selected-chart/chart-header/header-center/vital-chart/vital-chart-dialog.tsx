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
import { BarChartBig } from 'lucide-react'
import dynamic from 'next/dynamic'
import { useState } from 'react'

const LazyVitalChartContent = dynamic(() => import('./vital-chart-content'), {
  ssr: false,
  loading: () => <LargeLoaderCircle />,
})

export default function VitalChartDialog({ patientId }: { patientId: string }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [currentVital, setCurrentVital] = useState('체중')

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <BarChartBig size={18} />
        </Button>
      </DialogTrigger>

      <DialogContent className="flex h-[720px] sm:max-h-[720px] sm:max-w-[1400px]">
        <DialogTitle className="hidden" />
        <DialogDescription className="hidden" />

        <VitalChartSidebar
          currentVital={currentVital}
          setCurrentVital={setCurrentVital}
        />

        <LazyVitalChartContent
          currentVital={currentVital}
          patientId={patientId}
        />
      </DialogContent>
    </Dialog>
  )
}
