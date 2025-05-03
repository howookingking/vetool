'use client'

import LargeLoaderCircle from '@/components/common/large-loader-circle'
import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { MessageCircle } from 'lucide-react'
import dynamic from 'next/dynamic'
import { useState } from 'react'

const LazyFeedbackForm = dynamic(() => import('./feedback-form'), {
  ssr: false,
  loading: () => <LargeLoaderCircle className="h-[300px]" />,
})

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
          onClick={() => setIsPopoverFeedbackOpen(true)}
          variant="outline"
        >
          <MessageCircle />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-80">
        {isFeedbackPopoverOpen && (
          <LazyFeedbackForm
            setIsPopoverFeedbackOpen={setIsPopoverFeedbackOpen}
          />
        )}
      </PopoverContent>
    </Popover>
  )
}
