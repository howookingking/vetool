import { Accordion } from '@/components/ui/accordion'
import {
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import DobutamineCri from './drugs/dobutamine-cri'
import FurosemideCri from './drugs/furosemide-cri'

export default function Cri({ weight }: { weight: string }) {
  return (
    <div className="h-full">
      <SheetHeader>
        <SheetTitle>CRI</SheetTitle>
        <SheetDescription>필요한 약물은 피드백으로 남겨주세요</SheetDescription>
      </SheetHeader>

      <Accordion type="multiple">
        <FurosemideCri weight={weight} />

        <DobutamineCri weight={weight} />
      </Accordion>
    </div>
  )
}
