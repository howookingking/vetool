import RehydrationToolTip from '@/components/hospital/calculator/fluid-rate/rehydration/rehydration-tool-tip'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { calculateRehydration } from '@/lib/calculators/fluid-rate'
import { useState } from 'react'
import CalculatorResult from '../../result/calculator-result'

type Props = {
  weight: string
  handleLocalWeightChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default function RehydrationTab({
  weight,
  handleLocalWeightChange,
}: Props) {
  const [dehydrationRate, setDehydrationRate] = useState('5')
  const [rehydrationTime, setRehydrationTime] = useState('12')

  const result = calculateRehydration(weight, dehydrationRate, rehydrationTime)

  return (
    <div className="flex flex-col gap-4">
      <SheetHeader>
        <SheetTitle className="flex items-center gap-2">
          <span>Rehydration</span>
          <RehydrationToolTip />
        </SheetTitle>
        <SheetDescription>
          *on-going loss 및 maintenance rate은 계산하지 않음
        </SheetDescription>
      </SheetHeader>

      <div className="grid grid-cols-2 gap-2">
        <div className="relative">
          <Label htmlFor="weight">체중</Label>
          <Input
            type="number"
            id="weight"
            className="mt-1"
            value={weight}
            onChange={handleLocalWeightChange}
            placeholder="체중"
          />
          <span className="absolute bottom-2 right-2 text-sm text-muted-foreground">
            kg
          </span>
        </div>

        <div>
          <Label>탈수 정도</Label>
          <Select onValueChange={setDehydrationRate} value={dehydrationRate}>
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="탈수 정도 선택" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5">5%</SelectItem>
              <SelectItem value="7">7%</SelectItem>
              <SelectItem value="9">9%</SelectItem>
              <SelectItem value="11">11%</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="relative">
          <Label htmlFor="rehydrationTime">교정 시간</Label>
          <Input
            type="number"
            id="rehydrationTime"
            className="mt-1"
            value={rehydrationTime}
            onChange={(e) => setRehydrationTime(e.target.value)}
            placeholder="교정 시간"
          />
          <span className="absolute bottom-2 right-2 text-sm text-muted-foreground">
            hr
          </span>
        </div>
      </div>

      {result && (
        <CalculatorResult
          displayResult={
            <span className="font-bold text-primary">
              {result.ratePerHour.toString()} ml/hr
            </span>
          }
          copyResult={`${result.ratePerHour} ml/hr`}
          comment={`${result.totalMl}ml를 ${rehydrationTime}시간 동안 주입`}
        />
      )}
    </div>
  )
}
