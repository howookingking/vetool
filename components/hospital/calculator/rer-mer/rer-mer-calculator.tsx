import DietForm from '@/components/hospital/calculator/rer-mer/diet/diet-form'
import MerForm from '@/components/hospital/calculator/rer-mer/mer/mer-form'
import MerToolTip from '@/components/hospital/calculator/rer-mer/mer/mer-tool-tip'
import DisabledFeedbackButton from '@/components/hospital/common/disabled-feedback-button'
import { Separator } from '@/components/ui/separator'
import {
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { calculateRer } from '@/lib/calculators/rer-mer'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import { useState } from 'react'

type Props = {
  weight: string
  setIsSheetOpen?: React.Dispatch<React.SetStateAction<boolean>>
}

export default function RerMerCalculator({ weight, setIsSheetOpen }: Props) {
  const [localWeight, setLocalWeight] = useState(weight)
  const [factor, setFactor] = useState('1')

  const rer = calculateRer(localWeight)
  const mer = rer ? rer * Number(factor) : undefined

  return (
    <>
      <div>
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <span>MER</span>
            <MerToolTip />
          </SheetTitle>
          <VisuallyHidden>
            <SheetDescription />
          </VisuallyHidden>
        </SheetHeader>

        <MerForm
          localWeight={localWeight}
          setLocalWeight={setLocalWeight}
          factor={factor}
          setFactor={setFactor}
          rer={rer}
          result={mer}
        />
      </div>

      <Separator className="my-4" />

      <div>
        <SheetTitle className="flex items-center gap-2">
          <span>사료량</span>
        </SheetTitle>
        <SheetDescription className="flex items-center gap-2">
          추가가 필요한 사료는 <DisabledFeedbackButton />
        </SheetDescription>

        <DietForm mer={mer} setIsSheetOpen={setIsSheetOpen} />
      </div>
    </>
  )
}
