import HelperTooltip from '@/components/common/helper-tooltip'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { KCL_SUPPLEMENT_TABLE } from '@/constants/hospital/kcl'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import { useState } from 'react'
import CalculatorResult from '../result/calculator-result'
import KclTable from './kcl-table'

type Props = {
  weight: string
  setIsSheetOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export default function Kcl({ weight, setIsSheetOpen }: Props) {
  const [localWeight, setLocalWeight] = useState(weight)
  const [selectedKcl, setSelectedKcl] = useState<string | null>(null)
  const [fluid, kclMl] = selectedKcl?.split('-') ?? []

  const selectedKclData = KCL_SUPPLEMENT_TABLE.find(
    (row) =>
      `ns-${row.ns500}` === selectedKcl ||
      `hs-${row.hs500}` === selectedKcl ||
      `ps-${row.ps500}` === selectedKcl,
  )

  const result =
    selectedKclData && localWeight
      ? `${fluid.toLocaleUpperCase()} + KCl ${kclMl}mL, 최대 수액속도 : ${(selectedKclData.maxFluidRate * Number(localWeight)).toFixed(1)}mL/hr`
      : null

  return (
    <>
      <SheetHeader>
        <SheetTitle className="flex items-center gap-2">
          <span>KCl(2mEq/mL) 첨가</span>
          <HelperTooltip side="right">
            *Textbook of Small Animal Emergency Medicine, 2019 John Wiley and
            Sons
          </HelperTooltip>
        </SheetTitle>
        <VisuallyHidden>
          <SheetDescription />
        </VisuallyHidden>
      </SheetHeader>

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-2">
          <div className="relative">
            <Label htmlFor="weight">체중</Label>
            <Input
              autoComplete="off"
              type="number"
              id="weight"
              className="mt-1"
              value={localWeight}
              onChange={(e) => setLocalWeight(e.target.value)}
              placeholder="체중"
            />
            <span className="absolute bottom-2 right-2 text-sm text-muted-foreground">
              kg
            </span>
          </div>
        </div>

        <KclTable
          localWeight={Number(localWeight)}
          selectedKcl={selectedKcl}
          setSelectedKCl={setSelectedKcl}
        />

        {result && (
          <CalculatorResult
            displayResult={
              <span className="font-bold text-primary">{result}</span>
            }
            copyResult={`${result}`}
            hasInsertOrderButton
            orderType="fluid"
            setIsSheetOpen={setIsSheetOpen}
          />
        )}
      </div>
    </>
  )
}
