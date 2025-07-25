import NewFeature from '@/components/common/new-feature'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { CALCULATORS } from '@/constants/hospital/icu/calculator/calculator'
import { cn } from '@/lib/utils/utils'
import type { SelectedCalculator } from '@/types/hospital/calculator'
import type { Dispatch, SetStateAction } from 'react'

type Props = {
  selectedCalculator: SelectedCalculator
  setSelectedCalculator: Dispatch<SetStateAction<SelectedCalculator>>
}

export default function CalculatorSidebar({
  selectedCalculator,
  setSelectedCalculator,
}: Props) {
  return (
    <>
      {/* DESKTOP */}
      <ul className="hidden flex-col border-r md:flex">
        {CALCULATORS.map((calculator) => (
          <li key={calculator.value}>
            <Button
              className={cn(
                selectedCalculator === calculator.value &&
                  'bg-primary text-white',
                'h-10 w-full rounded-none',
              )}
              variant="ghost"
              onClick={() => setSelectedCalculator(calculator.value)}
            >
              <NewFeature
                className={cn(
                  '-right-2 -top-0.5',
                  calculator.value !== 'cri' && 'hidden',
                )}
              >
                {calculator.label}
              </NewFeature>
            </Button>
          </li>
        ))}
      </ul>

      {/* MOBILE */}
      <Select
        onValueChange={(value) =>
          setSelectedCalculator(value as SelectedCalculator)
        }
        value={selectedCalculator}
      >
        <SelectTrigger className="ml-2 mt-2 w-[240px] md:hidden">
          <SelectValue defaultValue={selectedCalculator} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {CALCULATORS.map((calculator) => (
              <SelectItem key={calculator.value} value={calculator.value}>
                <NewFeature
                  className={cn(
                    '-right-2 -top-0.5',
                    calculator.value !== 'kcl' &&
                      'hidden' &&
                      calculator.value !== 'cri' &&
                      'hidden',
                  )}
                >
                  {calculator.label}
                </NewFeature>
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </>
  )
}
