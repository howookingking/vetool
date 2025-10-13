'use client'

import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { MessageCircleIcon } from 'lucide-react'
import { useState } from 'react'
import FeedbackForm from './feedback-form'

export default function Feedback() {
  const [isPopverOpen, setIsPopoverOpen] = useState(false)

  return (
    <Popover open={isPopverOpen} onOpenChange={setIsPopoverOpen}>
      <PopoverTrigger asChild>
        <Button
          size="icon"
          className="h-8 w-8 rounded-full shadow-lg"
          variant="outline"
        >
          <MessageCircleIcon />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-80">
        <FeedbackForm setIsPopoverOpen={setIsPopoverOpen} />
      </PopoverContent>
    </Popover>
  )
}
