import { Accordion } from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import {
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { MessageCircle } from 'lucide-react'
import DobutamineCri from './drugs/dobutamine-cri'
import FurosemideCri from './drugs/furosemide-cri'

export default function Cri({ weight }: { weight: string }) {
  return (
    <div className="h-full">
      <SheetHeader>
        <SheetTitle>CRI</SheetTitle>
        <SheetDescription className="flex items-center gap-2">
          필요한 약물은
          <Button
            variant="outline"
            size="icon"
            className="cursor-default rounded-full"
          >
            <MessageCircle />
          </Button>
          으로 말씀해주세요
        </SheetDescription>
      </SheetHeader>

      <Accordion type="multiple">
        <FurosemideCri weight={weight} />

        <DobutamineCri weight={weight} />
      </Accordion>
    </div>
  )
}
