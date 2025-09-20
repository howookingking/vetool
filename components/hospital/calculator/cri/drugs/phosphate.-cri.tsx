import HelperTooltip from '@/components/common/helper-tooltip'
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

// 포스텐 제품 1ml = 인 1mmol, 칼륨 1mEq(=1mmol)
const PHOSPHATE_CONCENTRATION = 1

type Props = {
  weight: string
  setIsSheetOpen: React.Dispatch<React.SetStateAction<boolean>>
  handleChangeWeight: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default function PhosphateCri({
  weight,
  setIsSheetOpen,
  handleChangeWeight,
}: Props) {
  const { patient_id } = useParams()
  const hasSelectedPatient = Boolean(patient_id)

  // fluidVol에 phosphateVol를 넣고 fluidRate 속도로 투여
  // fluidVol + phosphateVol = totalVol
  // phosphateDoseRate  = 0.01 ~ 0.12 mmol/kg/hr
  const [phosphateDoseRate, setPhosphateDoseRate] = useState('0.01')
  const [syringeVol, setSyringeVol] = useState('30')
  const [fluidRate, setFluidRate] = useState('2')

  // 1. 시간당 필요한 phosphate 용량 계산 (mmol/hr)
  const hourlyDose = Number(phosphateDoseRate) * Number(weight)

  // 2. 시간당 필요한 phosphate 원액 용량 계산 (mL/hr)
  const hourlyVolume = hourlyDose / PHOSPHATE_CONCENTRATION

  // 3. 주사기 용량에 맞춰 phosphate와 수액의 비율 계산
  // hourlyVolume : fluidRate = x : syringeVolume
  const phosphateVol = (
    (Number(hourlyVolume) * Number(syringeVol)) /
    Number(fluidRate)
  ).toFixed(2)

  const fluidVol = (Number(syringeVol) - Number(phosphateVol)).toFixed(2)

  return (
    <AccordionItem value="phosphate">
      <AccordionTrigger>
        <div className="flex items-center gap-2">
          <span>Phosten (136.1mg/ml)</span>
          <HelperTooltip>
            <p>
              포스텐은 정맥용 고삼투성 제제로, 반드시 희석하여 사용해야 합니다.
            </p>
            <p className="text-muted-foreground">
              → 보통 0.9% 생리식염수에 희석하여 CRI로 투여합니다.
            </p>
            <p className="text-destructive">
              ⚠️ 락테이트 링거액에 희석하면 칼슘과 침전 발생 위험이 있습니다.
            </p>
            <br />

            <p>포스텐(KH₂PO₄) 1mL = 인 1mmol + 칼륨 1mEq</p>
            <p>💡 수액 내 총 칼륨 보충량을 계산에 포함하세요.</p>
            <br />

            <p>📏 권장 속도: 0.01 ~ 0.12 mmol/kg/hr (인 기준)</p>
            <p className="text-muted-foreground">
              치료 시작 후 4~6시간마다 P, iCa, K 재검사 권장
            </p>
            <p className="text-destructive">
              🚨 과량 보충 시: 고인산혈증, 저칼슘혈증, 석회화, 신부전,
              고칼륨혈증 주의
            </p>
            <br />

            <p>
              * Small Animal Critical Care Medicine Second Edition, Deborah
              Silverstein & Kate Hopper
            </p>
          </HelperTooltip>
        </div>
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
            <Label htmlFor="phosphateDose">약물 용량 (0.01 ~ 0.12)</Label>
            <Input
              type="number"
              id="phosphateDose"
              className="mt-1"
              value={phosphateDoseRate}
              onChange={(e) => setPhosphateDoseRate(e.target.value)}
              placeholder="퓨로세마이드 용량"
            />
            <span className="absolute bottom-2 right-2 text-sm text-muted-foreground">
              mmol/kg/hr
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

        {Number(fluidVol) > 0 && Number(phosphateVol) > 0 && (
          <CalculatorResult
            displayResult={
              <>
                NS <span className="font-bold text-primary">{fluidVol}mL</span>{' '}
                + 포스텐{' '}
                <span className="font-bold text-primary">{phosphateVol}mL</span>{' '}
                , FR :{' '}
                <span className="font-bold text-primary">
                  {fluidRate}mL/hr
                </span>{' '}
              </>
            }
            copyResult={`NS ${fluidVol}mL + 포스텐 ${phosphateVol}mL , FR : ${fluidRate}mL/hr`}
            hasInsertOrderButton={hasSelectedPatient}
            setIsSheetOpen={setIsSheetOpen}
          />
        )}
      </AccordionContent>
    </AccordionItem>
  )
}
