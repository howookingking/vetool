import { Accordion } from '@/components/ui/accordion'
import {
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import DisabledFeedbackButton from '../../common/disabled-feedback-button'
import DobutamineCri from './drugs/dobutamine-cri'
import FurosemideCri from './drugs/furosemide-cri'

export default function Cri({ weight }: { weight: string }) {
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
        <FurosemideCri weight={weight} />

        <DobutamineCri weight={weight} />
      </Accordion>
    </div>
  )
}
