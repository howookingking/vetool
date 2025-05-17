import HelperTooltip from '@/components/common/helper-tooltip'
import { Button } from '@/components/ui/button'
import {
  CHARTABLE_VITALS,
  type ChartableVital,
} from '@/constants/hospital/icu/chart/vital-chart'
import { cn } from '@/lib/utils/utils'
import { LineChart } from 'lucide-react'
import type { Dispatch, SetStateAction } from 'react'

type Props = {
  currentVital: ChartableVital
  setCurrentVital: Dispatch<SetStateAction<ChartableVital>>
  setDisplayCount: Dispatch<SetStateAction<number>>
}

export default function VitalChartSidebar({
  currentVital,
  setCurrentVital,
  setDisplayCount,
}: Props) {
  const handleVitalClick = (vital: ChartableVital) => {
    setCurrentVital(vital)
    setDisplayCount(10)
  }
  return (
    <aside className="flex h-full min-w-[180px] flex-col border-r">
      <div className="flex items-center justify-center gap-2 border-b py-4 font-bold">
        <LineChart />
        <span>바이탈 그래프</span>
        <HelperTooltip>
          체크리스트 오더 중 체중, 혈압, 호흡수, 심박수, 체온, 혈당, SPO2를
          그래프로 보여줍니다. 결과 값에 되도록 숫자만 입력해주세요.
        </HelperTooltip>
      </div>

      <ul className="flex flex-col">
        {CHARTABLE_VITALS.map((vital) => (
          <li key={vital}>
            <Button
              variant="ghost"
              onClick={() => handleVitalClick(vital)}
              className={cn(
                'h-10 w-full rounded-none',
                currentVital === vital && 'bg-primary text-white',
              )}
            >
              {vital}
            </Button>
          </li>
        ))}
      </ul>
    </aside>
  )
}
