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
    <div className="fixed bottom-1 right-1 z-20">
      <Popover
        open={isFeedbackPopoverOpen}
        onOpenChange={setIsPopoverFeedbackOpen}
      >
        <PopoverTrigger asChild>
          <Button
            size="icon"
            className="h-8 w-8 rounded-full shadow-lg"
            onClick={() => setIsPopoverFeedbackOpen(true)}
          >
            <MessageCircle className="h-6 w-6" />
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
    </div>
  )
}
