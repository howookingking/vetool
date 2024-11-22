'use client'

import LargeLoaderCircle from '@/components/common/large-loader-circle'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Info } from 'lucide-react'
import dynamic from 'next/dynamic'

const LazyInstructionShortcutContent = dynamic(
  () => import('./instruction-shortcut-content'),
  {
    ssr: false,
    loading: () => <LargeLoaderCircle />,
  },
)

export function InstructionDialog() {
  // const [currentVideo, setCurrentVideo] = useState({
  //   menuId: 1,
  //   slideId: 1,
  // })

  return (
    <Dialog>
      <DialogTrigger asChild className="hidden md:inline-flex">
        <Button variant="ghost" size="icon">
          <Info size={18} />
        </Button>
      </DialogTrigger>
      <DialogContent className="h-[720px] p-0 sm:max-h-[720px] sm:max-w-[1400px]">
        <DialogTitle className="hidden" />
        <DialogDescription className="hidden" />
        <LazyInstructionShortcutContent />
        {/* <InstructionSidebar
            currentVideo={currentVideo}
            setCurrentVideo={setCurrentVideo}
          /> */}

        {/* <DynamicInstructionContents
            currentVideo={currentVideo}
            setCurrentVideo={setCurrentVideo}
          /> */}
      </DialogContent>
    </Dialog>
  )
}
