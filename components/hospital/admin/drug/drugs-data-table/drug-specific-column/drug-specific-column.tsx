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
import { HosDrugDosages } from '@/types/icu/drugs'
import DrugTags from '../drug-tags'
import { MoreVertical } from 'lucide-react'
export default function DrugSpecificColumn({
  drugIndication,
  drugSideEffect,
  drugDescription,
  drugDoses,
  rawDrugName,
  drugTags,
}: {
  drugIndication: string | null
  drugSideEffect: string | null
  drugDescription: string | null
  drugDoses: HosDrugDosages
  rawDrugName: string
  drugTags: string | null
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <MoreVertical />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[1000px]">
        <DialogHeader>
          <DialogTitle>{rawDrugName}</DialogTitle>
          <DialogDescription />
          <DrugTags drugTags={drugTags} />
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <p>{drugDescription}</p>
          <p>{drugIndication}</p>
          <p>{drugSideEffect}</p>
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
