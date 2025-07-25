import NewFeature from '@/components/common/new-feature'
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

const NOREPI_CONCENTRATION = 1 // mg/mL (1mg/1mL)

type Props = {
  weight: string
  setIsSheetOpen: React.Dispatch<React.SetStateAction<boolean>>
  handleChangeWeight: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default function NorepinephrineCri({
  weight,
  setIsSheetOpen,
  handleChangeWeight,
}: Props) {
  const { patient_id } = useParams()
  const hasSelectedPatient = Boolean(patient_id)

  const [norepiDose, setNorepiDose] = useState('0.05')
  const [syringeVol, setSyringeVol] = useState('30')
  const [fluidRate, setFluidRate] = useState('2')

  // 1. 시간당 필요한 노르에피네프린 용량 계산 (mg/hr)
  const hourlyDose = (Number(norepiDose) * Number(weight) * 60) / 1000 // µg → mg

  // 2. 시간당 필요한 노르에피네프린 원액 용량 계산 (mL/hr)
  const hourlyVolume = hourlyDose / NOREPI_CONCENTRATION

  // 3. 첨가할 노르에피네프린 볼륨 (mL)
  const norepiVol = (
    (Number(syringeVol) * hourlyVolume) /
    (Number(fluidRate) - hourlyVolume)
  ).toFixed(2)

  return (
    <AccordionItem value="norepinephrine">
      <AccordionTrigger>
        <NewFeature className="-right-2 top-0">
          Norepinephrine (1mg/mL)
        </NewFeature>
      </AccordionTrigger>

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
            <Label htmlFor="norepiDose">약물 용량 (0.05 ~ 3)</Label>
            <Input
              type="number"
              id="norepiDose"
              className="mt-1"
              value={norepiDose}
              onChange={(e) => setNorepiDose(e.target.value)}
              placeholder="노르에피네프린 용량"
            />
            <span className="absolute bottom-2 right-2 text-sm text-muted-foreground">
              µg/kg/min
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
              placeholder="주사기 용량"
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
              placeholder="수액 속도"
            />
            <span className="absolute bottom-2 right-2 text-sm text-muted-foreground">
              mL/hr
            </span>
          </div>
        </div>

        {Number(norepiVol) > 0 && (
          <CalculatorResult
            displayResult={
              <div>
                수액{' '}
                <span className="font-bold text-primary">{syringeVol}mL</span> +
                Norepinephrine{' '}
                <span className="font-bold text-primary">{norepiVol}mL</span> ,
                FR :{' '}
                <span className="font-bold text-primary">{fluidRate}mL/hr</span>
              </div>
            }
            copyResult={`수액 ${syringeVol}mL + Norepinephrine ${norepiVol}mL , FR : ${fluidRate}mL/hr`}
            hasInsertOrderButton={hasSelectedPatient}
            setIsSheetOpen={setIsSheetOpen}
          />
        )}
      </AccordionContent>
    </AccordionItem>
  )
}
