'use client'

import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { MessageCircle } from 'lucide-react'
import { useState } from 'react'
import FeedbackForm from './feedback-form'

export default function Feedback() {
  const [isFeedbackPopoverOpen, setIsPopoverFeedbackOpen] = useState(false)

  return (
    <Popover
      open={isFeedbackPopoverOpen}
      onOpenChange={setIsPopoverFeedbackOpen}
    >
      <PopoverTrigger asChild>
        <Button
          size="icon"
          className="h-8 w-8 rounded-full shadow-lg"
          variant="outline"
        >
          <MessageCircle />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-80">
        <FeedbackForm setIsPopoverFeedbackOpen={setIsPopoverFeedbackOpen} />
      </PopoverContent>
    </Popover>
  )
}
