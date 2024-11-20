'use client'

import LargeLoaderCircle from '@/components/common/large-loader-circle'
import InstructionSidebar from '@/components/hospital/icu/header/instruction/(unused)/instruction-sidebar'
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
import { useState } from 'react'
import InstructionShortcutContent from '@/components/hospital/icu/header/instruction/instruction-shortcut-content'

// const DynamicInstructionContents = dynamic(
//   () => import('./instruction-contents'),
//   {
//     ssr: false,
//     loading: () => <LargeLoaderCircle />,
//   },
// )

export function InstructionDialog() {
  const [currentVideo, setCurrentVideo] = useState({
    menuId: 1,
    slideId: 1,
  })

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
        <div className="flex h-full">
          <InstructionShortcutContent />
          {/* <InstructionSidebar
            currentVideo={currentVideo}
            setCurrentVideo={setCurrentVideo}
          /> */}

          {/* <DynamicInstructionContents
            currentVideo={currentVideo}
            setCurrentVideo={setCurrentVideo}
          /> */}
        </div>
      </DialogContent>
    </Dialog>
  )
}
