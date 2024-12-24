import VitalChartSidebar from '@/components/hospital/icu/main/chart/selected-chart/chart-header/header-center/vital-chart/vital-chart-sidebar'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { BarChartBig } from 'lucide-react'
import { useState } from 'react'

export default function VitalChartDialog() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [currentVital, setCurrentVital] = useState('체중')

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <BarChartBig size={18} />
        </Button>
      </DialogTrigger>

      <DialogContent className="h-[720px] sm:max-h-[720px] sm:max-w-[1600px]">
        <DialogTitle className="hidden" />
        <DialogDescription className="hidden" />

        <VitalChartSidebar
          currentVital={currentVital}
          setCurrentVital={setCurrentVital}
        />
      </DialogContent>
    </Dialog>
  )
}
