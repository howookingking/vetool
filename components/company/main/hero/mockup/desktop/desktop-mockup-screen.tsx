import DesktopMockupHeader from '@/components/company/main/hero/mockup/desktop/desktop-mockup-header'
import DesktopMockupSidebar from '@/components/company/main/hero/mockup/desktop/desktop-mockup-sidebar'
import DesktopMockupTable from '@/components/company/main/hero/mockup/desktop/desktop-mockup-table'
import { ChevronDown } from 'lucide-react'

export default function DesktopMockupScreen() {
  return (
    <div className="bottom-0 hidden max-w-[740px] scale-50 overflow-hidden rounded-t-xl bg-primary p-1 sm:scale-100 md:block lg:max-w-full">
      <div className="flex items-center justify-between px-2 pb-2 pt-1">
        <div className="flex items-center gap-1.5">
          <span className="size-2 rounded-full bg-red-400" />
          <span className="size-2 rounded-full bg-yellow-400" />
          <span className="size-2 rounded-full bg-green-400" />
        </div>
        <span className="rounded bg-muted px-2 py-0.5 text-xs text-black">
          당신의 동물 병원
        </span>
        <ChevronDown className="text-white" />
      </div>

      <div className="relative z-0 grid h-full w-full grid-cols-[48px,_1fr] overflow-hidden rounded-t-lg bg-white">
        <DesktopMockupSidebar />
        <div className="relative z-0 p-2">
          <DesktopMockupHeader />
          <div className="h-full border-2 border-input p-2">
            <DesktopMockupTable />
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 top-0 z-10 bg-gradient-to-b from-white/0 to-white" />
      </div>
    </div>
  )
}
