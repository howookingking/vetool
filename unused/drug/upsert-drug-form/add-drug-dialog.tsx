import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Plus } from 'lucide-react'
// import DrugForm from './drug-form'
import { RawDrug } from '@/types'
import { DrugForm } from './drug-form'

export function AddDrugDialog({ rawDrugData }: { rawDrugData: RawDrug[] }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="icon" className="h-6 w-6 rounded-full">
          <Plus size={18} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[1000px]">
        <DialogHeader>
          <DialogTitle>약물 추가</DialogTitle>
          <DialogDescription>
            병원에서 사용할 약물을 등록합니다
          </DialogDescription>
        </DialogHeader>

        <DrugForm rawDrugData={rawDrugData} />
      </DialogContent>
    </Dialog>
  )
}
