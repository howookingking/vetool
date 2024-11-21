'use client'

import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import useIsMobile from '@/hooks/use-is-mobile'
import { cn } from '@/lib/utils/utils'
import { MessageCircle } from 'lucide-react'
import dynamic from 'next/dynamic'
import { useState } from 'react'
import FeedbackForm from './feedback-form'
import LargeLoaderCircle from '@/components/common/large-loader-circle'

const DynamicFeedbackForm = dynamic(() => import('./feedback-form'), {
  ssr: false,
  loading: () => <LargeLoaderCircle className="h-[300px]" />,
})

export default function Feedback() {
  const [isFeedbackPopoverOpen, setIsPopoverFeedbackOpen] = useState(false)
  const isMobile = useIsMobile()

  return (
    <div className={cn(isMobile ? 'hidden' : 'fixed bottom-1 right-1 z-20')}>
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
            <DynamicFeedbackForm
              setIsPopoverFeedbackOpen={setIsPopoverFeedbackOpen}
            />
          )}
        </PopoverContent>
      </Popover>
    </div>
  )
}
