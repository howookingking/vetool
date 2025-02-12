import { Button } from '@/components/ui/button'
import { VITALS } from '@/constants/hospital/icu/chart/vital'
import { cn } from '@/lib/utils/utils'
import { LineChart } from 'lucide-react'

type Props = {
  currentVital: string
  setCurrentVital: (vital: string) => void
}

export default function VitalChartSidebar({
  currentVital,
  setCurrentVital,
}: Props) {
  return (
    <aside className="flex h-full min-w-[180px] flex-col border-r">
      <div className="flex items-center justify-center gap-1 border-b py-4 font-bold">
        <LineChart />
        <span>바이탈 그래프</span>
      </div>

      <ul className="flex flex-col">
        {VITALS.map((vital) => (
          <li key={vital.title}>
            <Button
              variant="ghost"
              onClick={() => setCurrentVital(vital.title)}
              className={cn(
                'h-10 w-full rounded-none',
                currentVital === vital.title && 'bg-primary text-white',
              )}
            >
              {vital.title}
            </Button>
          </li>
        ))}
      </ul>
    </aside>
  )
}
