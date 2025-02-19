import { Accordion } from '@/components/ui/accordion'
import {
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import DisabledFeedbackButton from '../../common/disabled-feedback-button'
import DobutamineCri from './drugs/dobutamine-cri'
import FurosemideCri from './drugs/furosemide-cri'
import BicarbonateCri from './drugs/bicarbonate-cri'

type Props = {
  weight: string
  setIsSheetOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export default function Cri({ weight, setIsSheetOpen }: Props) {
  return (
    <div className="h-full">
      <SheetHeader>
        <SheetTitle>CRI</SheetTitle>
        <SheetDescription className="flex items-center gap-2">
          필요한 약물은
          <DisabledFeedbackButton />
        </SheetDescription>
      </SheetHeader>

      <Accordion type="multiple">
        <FurosemideCri weight={weight} setIsSheetOpen={setIsSheetOpen} />

        <DobutamineCri weight={weight} setIsSheetOpen={setIsSheetOpen} />

        <BicarbonateCri weight={weight} setIsSheetOpen={setIsSheetOpen} />
      </Accordion>
    </div>
  )
}
