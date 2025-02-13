import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useState } from 'react'
import CalculatorResult from '../../calculator-result'

export default function FurosemideCri({ weight }: { weight: string }) {
  // fluidVol에 furosemideVol를 넣고 fluidRate 속도로 투여
  // fluidVol + furosemideVol = totalVol
  // furosemideDose = 0.2 ~ 1 mg/kg/hr
  const [furosemideDose, setFurosemideDose] = useState('1')
  const [syringeVol, setSyringeVol] = useState('30')
  const [fluidRate, setFluidRate] = useState('2')
  const [localWeight, setLocalWeight] = useState(weight)

  const furosemideVol = (
    (Number(furosemideDose) * Number(localWeight) * Number(syringeVol)) /
    Number(fluidRate) /
    10
  ).toFixed(2)

  const fluidVol = (Number(syringeVol) - Number(furosemideVol)).toFixed(2)

  return (
    <AccordionItem value="furosemide">
      <AccordionTrigger>
        <div className="flex flex-col items-start">
          <span>Furosemide (20mg/2ml = 10mg/1ml)</span>
        </div>
      </AccordionTrigger>

      <AccordionContent className="space-y-4 px-1">
        <div className="grid grid-cols-2 gap-2">
          <div>
            <Label htmlFor="weight">체중 (kg)</Label>
            <Input
              type="number"
              id="weight"
              className="mt-1"
              value={localWeight}
              onChange={(e) => setLocalWeight(e.target.value)}
              placeholder="체중"
            />
          </div>

          <div>
            <Label htmlFor="furosemideDose">약물 용량 (0.2 ~ 1mg/kg/hr)</Label>
            <Input
              type="number"
              id="furosemideDose"
              className="mt-1"
              value={furosemideDose}
              onChange={(e) => setFurosemideDose(e.target.value)}
              placeholder="퓨로세마이드 용량"
            />
          </div>

          <div>
            <Label htmlFor="syringeVol">사용할 주사기 (cc)</Label>
            <Input
              type="number"
              id="syringeVol"
              className="mt-1"
              value={syringeVol}
              onChange={(e) => setSyringeVol(e.target.value)}
              placeholder="사용할 주사기"
            />
          </div>

          <div>
            <Label htmlFor="fluidRate">수액 속도 (ml/hr)</Label>
            <Input
              type="number"
              id="fluidRate"
              className="mt-1"
              value={fluidRate}
              onChange={(e) => setFluidRate(e.target.value)}
              placeholder="수액속도"
            />
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
