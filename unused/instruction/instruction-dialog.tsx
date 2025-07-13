'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Info } from 'lucide-react'
import InstructionShortcutContent from './instruction-shortcut-content'

export function InstructionDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild className="hidden 2xl:inline-flex">
        <Button variant="ghost" size="icon">
          <Info size={18} />
        </Button>
      </DialogTrigger>
      <DialogContent className="h-[720px] p-0 sm:max-h-[720px] sm:max-w-[1400px]">
        <DialogTitle className="hidden" />
        <DialogDescription className="hidden" />
        <InstructionShortcutContent />
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
