import { cn } from '@/lib/utils/utils'
import { Button } from '@/components/ui/button'
import { SquareActivity } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import { VITALS } from '@/constants/hospital/icu/chart/vital'

export default function VitalChartSidebar({
  currentVital,
  setCurrentVital,
}: {
  currentVital: string
  setCurrentVital: (vital: string) => void
}) {
  return (
    <aside className="flex h-full min-w-[160px] justify-between">
      <div className="flex h-full w-full flex-col">
        <div className="flex h-12 items-center justify-center gap-1 font-bold shadow-sm">
          <SquareActivity />
          <span>바이탈 차트</span>
        </div>

        <ul className="flex flex-col gap-1 py-2">
          {VITALS.map((vital) => (
            <li key={vital.id}>
              <Button
                variant="ghost"
                disabled={!vital.isActive}
                onClick={() => setCurrentVital(vital.title)}
                className={cn(
                  'h-10 w-full rounded-none',
                  currentVital === vital.title && 'bg-muted',
                )}
              >
                {vital.title}
              </Button>
            </li>
          ))}
        </ul>
      </div>

      <Separator orientation="vertical" className="ml-4 bg-slate-300" />
    </aside>
  )
}
