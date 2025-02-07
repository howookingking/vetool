import ChocolateResult from '@/components/hospital/calculator/chocolate/chocolate-result'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
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
  THEOBROMINE_LEVELS,
  TOXICITY_LEVELS,
} from '@/constants/hospital/icu/calculator/calculator'
import { useState } from 'react'
import ChocolateToolTip from './chocolate-tool-tip'

export default function Chocolate({ weight }: { weight: string }) {
  const [localWeight, setLocalWeight] = useState(weight)
  const [chocolateType, setChocolateType] = useState('')
  const [chocolateAmount, setChocolateAmount] = useState('')

  const calculateToxicity = () => {
    if (!weight || !chocolateAmount || !chocolateType) return null

    const dogWeight = parseFloat(weight)
    const amount = parseFloat(chocolateAmount)
    const theobromine =
      THEOBROMINE_LEVELS[chocolateType as keyof typeof THEOBROMINE_LEVELS]

    // 총 테오브로민 섭취량 (mg)
    const totalTheobromine = amount * theobromine

    // 체중당 테오브로민 섭취량 (mg/kg)
    const theobromineDose = totalTheobromine / dogWeight

    return theobromineDose
  }

  const getToxicityLevel = (dose: number) => {
    if (!dose) return null
    if (dose < TOXICITY_LEVELS.mild) return '안전'
    if (dose < TOXICITY_LEVELS.moderate) return '경미'
    if (dose < TOXICITY_LEVELS.severe) return '중등도'
    return '심각'
  }

  const dose = calculateToxicity()
  const toxicityLevel = getToxicityLevel(dose ?? 0)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          초콜릿 섭취 위험도
          <ChocolateToolTip />
        </CardTitle>
      </CardHeader>

      <CardContent className="grid grid-cols-2 gap-2">
        <div className="space-y-2">
          <Label>체중 (kg)</Label>
          <Input
            type="number"
            value={localWeight}
            onChange={(e) => setLocalWeight(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label>초콜릿 종류</Label>
          <Select
            value={chocolateType}
            onValueChange={(value) => setChocolateType(value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="초콜릿 종류를 선택하세요" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="white">화이트 초콜릿</SelectItem>
              <SelectItem value="milk">밀크 초콜릿</SelectItem>
              <SelectItem value="darkMild">
                다크 초콜릿 (코코아 50-69%)
              </SelectItem>
              <SelectItem value="darkBitter">
                다크 초콜릿 (코코아 70% 이상)
              </SelectItem>
              <SelectItem value="bakingChoc">베이킹 초콜릿</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>섭취한 초콜릿 양 (g)</Label>
          <Input
            type="number"
            value={chocolateAmount}
            onChange={(e) => setChocolateAmount(e.target.value)}
            min="0"
            step="0.1"
          />
        </div>

        {dose && toxicityLevel && (
          <ChocolateResult dose={dose} toxicityLevel={toxicityLevel} />
        )}
      </CardContent>
    </Card>
  )
}
