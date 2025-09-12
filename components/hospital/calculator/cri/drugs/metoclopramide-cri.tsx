import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useParams } from 'next/navigation'
import { useState } from 'react'
import CalculatorResult from '../../result/calculator-result'

const METOCLOPRAMIDE_CONCENTRATION = 5

type Props = {
  weight: string
  setIsSheetOpen: React.Dispatch<React.SetStateAction<boolean>>
  handleChangeWeight: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default function MetoclopramideCri({
  weight,
  setIsSheetOpen,
  handleChangeWeight,
}: Props) {
  const { patient_id } = useParams()
  const hasSelectedPatient = Boolean(patient_id)

  // fluidVol에 MetoVol를 넣고 fluidRate 속도로 투여
  // fluidVol + MetoVol = totalVol
  // MetoDoseRate = 0.01 ~ 0.083mg/kg/hr (0.01mg/kg/hr ~ 2mg/kg/day)
  const [metoDoseRate, setmetoDoseRate] = useState('0.01')
  const [syringeVol, setSyringeVol] = useState('30')
  const [fluidRate, setFluidRate] = useState('2')

  // 1. 시간당 필요한 메토 용량 계산 (mg/hr)
  const hourlyDose = Number(metoDoseRate) * Number(weight)

  // 2. 시간당 필요한 메토 원액 용량 계산 (mL/hr)
  const hourlyVolume = hourlyDose / METOCLOPRAMIDE_CONCENTRATION

  // 3. 주사기 용량에 맞춰 메토와 수액의 비율 계산
  // (syringeVolume + x) : fluidRate = x : hourlyVolume
  const metoVol = (
    (Number(syringeVol) * hourlyVolume) /
    (Number(fluidRate) - hourlyVolume)
  ).toFixed(2)

  return (
    <AccordionItem value="Meto">
      <AccordionTrigger>Metoclopramide (5mg/mL)</AccordionTrigger>

      <AccordionContent className="space-y-4 px-1">
        <div className="grid grid-cols-2 gap-2">
          <div className="relative">
            <Label htmlFor="weight">체중</Label>
            <Input
              type="number"
              id="weight"
              className="mt-1"
              value={weight}
              onChange={handleChangeWeight}
              placeholder="체중"
            />
            <span className="absolute bottom-2 right-2 text-sm text-muted-foreground">
              kg
            </span>
          </div>

          <div className="relative">
            <Label htmlFor="MetoDose">약물 용량 (0.01 ~ 0.083)</Label>
            <Input
              type="number"
              id="MetoDose"
              className="mt-1"
              value={metoDoseRate}
              onChange={(e) => setmetoDoseRate(e.target.value)}
              placeholder="메토클로프로마이드 용량"
            />
            <span className="absolute bottom-2 right-2 text-sm text-muted-foreground">
              mg/kg/hr
            </span>
          </div>

          <div className="relative">
            <Label htmlFor="syringeVol">사용할 주사기</Label>
            <Input
              type="number"
              id="syringeVol"
              className="mt-1"
              value={syringeVol}
              onChange={(e) => setSyringeVol(e.target.value)}
              placeholder="사용할 주사기"
            />
            <span className="absolute bottom-2 right-2 text-sm text-muted-foreground">
              cc
            </span>
          </div>

          <div className="relative">
            <Label htmlFor="fluidRate">수액 속도</Label>
            <Input
              type="number"
              id="fluidRate"
              className="mt-1"
              value={fluidRate}
              onChange={(e) => setFluidRate(e.target.value)}
              placeholder="수액속도"
            />
            <span className="absolute bottom-2 right-2 text-sm text-muted-foreground">
              mL/hr
            </span>
          </div>
        </div>

        {Number(metoVol) > 0 && (
          <CalculatorResult
            displayResult={
              <div>
                수액{' '}
                <span className="font-bold text-primary">{syringeVol}mL</span> +
                Metoclopramide{' '}
                <span className="font-bold text-primary">{metoVol}mL</span> , FR
                :{' '}
                <span className="font-bold text-primary">
                  {fluidRate}mL/hr
                </span>{' '}
              </div>
            }
            copyResult={`수액 ${syringeVol}mL + Metoclopramide ${metoVol}mL , FR : ${fluidRate}mL/hr`}
            hasInsertOrderButton={hasSelectedPatient}
            setIsSheetOpen={setIsSheetOpen}
          />
        )}
      </AccordionContent>
    </AccordionItem>
  )
}
