import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useState } from 'react'
import CalculatorResult from '../../calculator-result'

const DOBUTAMINE_CONCENTRATION = 50

export default function DobutamineCri({ weight }: { weight: string }) {
  // fluidVol에 dobutamineVol를 넣고 fluidRate 속도로 투여
  // fluidVol + dobutamineVol = totalVol
  // dobutamineDose = 개: 5 ~ 20, 고양이: 1 ~ 5 ug/kg/hr
  const [dobutamineDose, setDobutamineDose] = useState('5')
  const [syringeVol, setSyringeVol] = useState('30')
  const [fluidRate, setFluidRate] = useState('2')
  const [localWeight, setLocalWeight] = useState(weight)

  // 1. 시간당 필요한 도부타민 용량 계산 (mg/hr)
  const hourlyDose = (Number(dobutamineDose) * Number(localWeight) * 60) / 1000

  // 2. 시간당 필요한 도부타민 원액 용량 계산 (ml/hr)
  const hourlyVolume = hourlyDose / DOBUTAMINE_CONCENTRATION

  // 3. 최종 첨가할 도부타민 용량 계산 (ml)
  // (syringeVolume + x) : fluidRate = x : hourlyVolume
  // x = (syringeVolume * hourlyVolume) / (fluidRate - hourlyVolume)
  const dobutamineVol = (
    (Number(syringeVol) * hourlyVolume) /
    (Number(fluidRate) - hourlyVolume)
  ).toFixed(2)

  return (
    <AccordionItem value="dobutamine">
      <AccordionTrigger>Dobutamine (50mg/1mL)</AccordionTrigger>

      <AccordionContent className="space-y-4 px-1">
        <div className="grid grid-cols-2 gap-2">
          <div className="relative">
            <Label htmlFor="weight">체중 </Label>
            <Input
              type="number"
              id="weight"
              className="mt-1"
              value={localWeight}
              onChange={(e) => setLocalWeight(e.target.value)}
              placeholder="체중"
            />
            <span className="absolute bottom-2 right-2 text-muted-foreground">
              kg
            </span>
          </div>

          <div className="relative">
            <Label htmlFor="dobutamineDose">
              약물 용량 (개: 5 ~ 20, 고양이: 1 ~ 5)
            </Label>
            <Input
              type="number"
              id="dobutamineDose"
              className="mt-1"
              value={dobutamineDose}
              onChange={(e) => setDobutamineDose(e.target.value)}
              placeholder="도부타민 용량"
            />
            <span className="absolute bottom-2 right-2 text-muted-foreground">
              μg/kg/min
            </span>
          </div>

          <div className="relative">
            <Label htmlFor="syringeVol">사용할 주사기 (cc)</Label>
            <Input
              type="number"
              id="syringeVol"
              className="mt-1"
              value={syringeVol}
              onChange={(e) => setSyringeVol(e.target.value)}
              placeholder="사용할 주사기"
            />
            <span className="absolute bottom-2 right-2 text-muted-foreground">
              cc
            </span>
          </div>

          <div className="relative">
            <Label htmlFor="fluidRate">수액 속도 (ml/hr)</Label>
            <Input
              type="number"
              id="fluidRate"
              className="mt-1"
              value={fluidRate}
              onChange={(e) => setFluidRate(e.target.value)}
              placeholder="수액속도"
            />
            <span className="absolute bottom-2 right-2 text-muted-foreground">
              ml/hr
            </span>
          </div>
        </div>

        {Number(dobutamineVol) > 0 && (
          <CalculatorResult
            displayResult={
              <div>
                수액{' '}
                <span className="font-bold text-primary">{syringeVol}ml</span> +
                Dobutamine{' '}
                <span className="font-bold text-primary">
                  {dobutamineVol}ml
                </span>{' '}
                , FR :{' '}
                <span className="font-bold text-primary">{fluidRate}ml/hr</span>{' '}
              </div>
            }
            copyResult={`수액 ${syringeVol}ml + Dobutamine ${dobutamineVol}ml , FR : ${fluidRate}ml/hr`}
          />
        )}
      </AccordionContent>
    </AccordionItem>
  )
}
