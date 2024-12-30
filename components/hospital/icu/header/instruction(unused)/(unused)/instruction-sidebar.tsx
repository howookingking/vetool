import { Button } from '@/components/ui/button'
import { INSTRUCTIONS } from '@/constants/hospital/icu/chart/instruction'
import { cn } from '@/lib/utils/utils'
import { Info } from 'lucide-react'
import { Dispatch, SetStateAction } from 'react'

export default function InstructionSidebar({
  setCurrentVideo,
  currentVideo,
}: {
  setCurrentVideo: Dispatch<
    SetStateAction<{
      menuId: number
      slideId: number
    }>
  >
  currentVideo: {
    menuId: number
    slideId: number
  }
}) {
  return (
    <aside className="w-[200px] border-r">
      <div className="flex h-12 items-center justify-center gap-1 font-bold shadow-sm">
        <Info size={18} />
        <span>입원차트</span>
      </div>
      <ul>
        {INSTRUCTIONS.map((item) => (
          <li key={item.title}>
            <Button
              onClick={() => setCurrentVideo({ menuId: item.id, slideId: 1 })}
              variant="ghost"
              className={cn(
                currentVideo.menuId === item.id && 'bg-muted',
                'h-10 w-full rounded-none',
              )}
            >
              {item.title}
            </Button>
          </li>
        ))}
      </ul>
    </aside>
  )
}
