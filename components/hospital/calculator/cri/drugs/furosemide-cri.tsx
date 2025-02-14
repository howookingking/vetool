import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useState } from 'react'
import CalculatorResult from '../../calculator-result'

const FUROSEMIDE_CONCENTRATION = 10

export default function FurosemideCri({ weight }: { weight: string }) {
  // fluidVol에 furosemideVol를 넣고 fluidRate 속도로 투여
  // fluidVol + furosemideVol = totalVol
  // furosemideDoseRate = 0.2 ~ 1 mg/kg/hr
  const [furosemideDoseRate, setFurosemideDoseRate] = useState('1')
  const [syringeVol, setSyringeVol] = useState('30')
  const [fluidRate, setFluidRate] = useState('2')
  const [localWeight, setLocalWeight] = useState(weight)

  // 1. 시간당 필요한 퓨로세미드 용량 계산 (mg/hr)
  const hourlyDose = Number(furosemideDoseRate) * Number(localWeight)

  // 2. 시간당 필요한 퓨로세미드 원액 용량 계산 (ml/hr)
  const hourlyVolume = hourlyDose / FUROSEMIDE_CONCENTRATION

  // 3. 주사기 용량에 맞춰 퓨로세미드와 수액의 비율 계산
  // 총 주입량 = fluidRate ml/hr
  // 이 중 퓨로세미드가 hourlyVolume ml/hr
  // hourlyVolume : fluidRate = x : syringeVolume
  const furosemideVol = (
    (Number(hourlyVolume) * Number(syringeVol)) /
    Number(fluidRate)
  ).toFixed(2)

  const fluidVol = (Number(syringeVol) - Number(furosemideVol)).toFixed(2)

  return (
    <AccordionItem value="furosemide">
      <AccordionTrigger>Furosemide (10mg/1ml)</AccordionTrigger>

      <AccordionContent className="space-y-4 px-1">
        <div className="grid grid-cols-2 gap-2">
          <div className="relative">
            <Label htmlFor="weight">체중</Label>
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
            <Label htmlFor="furosemideDose">약물 용량 (0.2 ~ 1)</Label>
            <Input
              type="number"
              id="furosemideDose"
              className="mt-1"
              value={furosemideDoseRate}
              onChange={(e) => setFurosemideDoseRate(e.target.value)}
              placeholder="퓨로세마이드 용량"
            />
            <span className="absolute bottom-2 right-2 text-muted-foreground">
              mg/kg/hr
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

        {Number(fluidVol) > 0 && Number(furosemideVol) > 0 && (
          <CalculatorResult
            displayResult={
              <div>
                수액{' '}
                <span className="font-bold text-primary">{fluidVol}ml</span> +
                Furosemide{' '}
                <span className="font-bold text-primary">
                  {furosemideVol}ml
                </span>{' '}
                , FR :{' '}
                <span className="font-bold text-primary">{fluidRate}ml/hr</span>{' '}
              </div>
            }
            copyResult={`수액 ${fluidVol}ml + Furosemide ${furosemideVol}ml , FR : ${fluidRate}ml/hr`}
          />
        )}
      </AccordionContent>
    </AccordionItem>
  )
}
