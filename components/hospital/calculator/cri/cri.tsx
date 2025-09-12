import { Accordion } from '@/components/ui/accordion'
import {
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { useState } from 'react'
import DisabledFeedbackButton from '../../common/disabled-feedback-button'
import BicarbonateCri from './drugs/bicarbonate-cri'
import DobutamineCri from './drugs/dobutamine-cri'
import FurosemideCri from './drugs/furosemide-cri'
import MetoclopramideCri from './drugs/metoclopramide-cri'
import NorepinephrineCri from './drugs/norepinephrine-cri'
import PhosphateCri from './drugs/phosphate.-cri'

type Props = {
  weight: string
  setIsSheetOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export default function Cri({ weight, setIsSheetOpen }: Props) {
  const [localWeight, setLocalWeight] = useState(weight)
  const handleChangeWeight = (e: React.ChangeEvent<HTMLInputElement>) =>
    setLocalWeight(e.target.value)

  return (
    <div className="h-full">
      <SheetHeader>
        <SheetTitle>CRI</SheetTitle>
        <SheetDescription className="flex items-center gap-2">
          필요한 약물은
          <DisabledFeedbackButton />
        </SheetDescription>
      </SheetHeader>

      <Accordion type="single">
        <FurosemideCri
          weight={localWeight}
          setIsSheetOpen={setIsSheetOpen}
          handleChangeWeight={handleChangeWeight}
        />

        <DobutamineCri
          weight={localWeight}
          setIsSheetOpen={setIsSheetOpen}
          handleChangeWeight={handleChangeWeight}
        />

        <NorepinephrineCri
          handleChangeWeight={handleChangeWeight}
          setIsSheetOpen={setIsSheetOpen}
          weight={localWeight}
        />

        <MetoclopramideCri
          weight={localWeight}
          setIsSheetOpen={setIsSheetOpen}
          handleChangeWeight={handleChangeWeight}
        />

        <BicarbonateCri
          weight={localWeight}
          setIsSheetOpen={setIsSheetOpen}
          handleChangeWeight={handleChangeWeight}
        />

        <PhosphateCri
          handleChangeWeight={handleChangeWeight}
          setIsSheetOpen={setIsSheetOpen}
          weight={localWeight}
        />
      </Accordion>
    </div>
  )
}
