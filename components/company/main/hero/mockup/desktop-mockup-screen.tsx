import { ChevronDown } from 'lucide-react'
import DesktopMockupHeader from './desktop-mockup-header'
import DesktopMockupSidebar from './desktop-mockup-sidebar'
import DesktopMockupTable from './desktop-mockup-table'

export default function DesktopMockupScreen() {
  return (
    <div className="relative mx-auto max-w-[1600px] select-none rounded-t-xl bg-primary px-1 pt-1 sm:block">
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

      <div className="grid h-full w-full grid-cols-[48px,_1fr] overflow-hidden rounded-t-lg bg-white">
        <DesktopMockupSidebar />

        <div className="p-2">
          <DesktopMockupHeader />

          <DesktopMockupTable />
        </div>
      </div>
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-white/20 to-white/80" />
    </div>
  )
}
