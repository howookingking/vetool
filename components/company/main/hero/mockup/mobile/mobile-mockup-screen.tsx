import MobileMockupHeader from '@/components/company/main/hero/mockup/mobile/mobile-mockup-header'
import DesktopMockupTable from '@/components/company/main/hero/mockup/desktop/desktop-mockup-table'
import { ChevronDown } from 'lucide-react'

export default function MobileMockupScreen() {
  return (
    <div className="bottom-0 block max-w-[360px] overflow-hidden rounded-t-xl bg-primary p-1 sm:hidden">
      <div className="flex items-center justify-between px-2 pb-2 pt-1">
        <div className="flex items-center gap-1.5">
          <span className="size-2 rounded-full bg-red-400" />
          <span className="size-2 rounded-full bg-yellow-400" />
          <span className="size-2 rounded-full bg-green-400" />
        </div>
        <span className="rounded bg-muted px-2 py-0.5 text-xs text-black">
          벳툴동물메디컬센터
        </span>
        <ChevronDown className="text-white" />
      </div>

      <div className="relative z-0 h-full w-full overflow-hidden rounded-t-lg bg-white">
        <div className="relative z-0 p-2">
          <MobileMockupHeader />
          <div className="h-full overflow-x-scroll border-2 border-input p-2">
            <DesktopMockupTable />
          </div>
        </div>
        <div className="absolute right-0 top-0 z-10 bg-gradient-to-b from-white/0 to-white" />
      </div>
    </div>
  )
}
