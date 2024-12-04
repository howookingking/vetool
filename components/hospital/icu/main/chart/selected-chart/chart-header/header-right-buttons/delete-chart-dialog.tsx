import LargeLoaderCircle from '@/components/common/large-loader-circle'
import WarningMessage from '@/components/common/warning-message'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Trash2 } from 'lucide-react'
import dynamic from 'next/dynamic'
import { useParams } from 'next/navigation'
import { useState } from 'react'

const LazyDeleteChartButtons = dynamic(() => import('./delete-chart-buttons'), {
  ssr: false,
  loading: () => <LargeLoaderCircle size={40} />,
})
export default function DeleteChartDialog({
  icuChartId,
  name,
  icuIoId,
  isFirstChart,
}: {
  icuChartId: string
  name: string
  icuIoId: string
  isFirstChart: boolean
}) {
  const { target_date } = useParams()
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Trash2 size={18} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{name}의 차트를 삭제하시겠습니까?</DialogTitle>
          <DialogDescription className="flex flex-col gap-1">
            <span>선택차트삭제 : {target_date}날 차트만 삭제합니다</span>
            <span>모든차트삭제 : 입원기간동안의 차트들을 모두 삭제합니다</span>
            <WarningMessage text="해당작업은 실행 후 되될릴 수 없습니다." />
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <LazyDeleteChartButtons
            setIsDialogOpen={setIsDialogOpen}
            isFirstChart={isFirstChart}
            icuChartId={icuChartId}
            icuIoId={icuIoId}
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
