'use client'

import LargeLoaderCircle from '@/components/common/large-loader-circle'
import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { MessageCircle, X } from 'lucide-react'
import dynamic from 'next/dynamic'
import { useState } from 'react'

const LazyChatForm = dynamic(
  () => import('@/components/company/ui/chat/chat-form'),
  {
    ssr: false,
    loading: () => <LargeLoaderCircle className="h-[300px]" />,
  },
)

export default function ChatWidget() {
  const [isChatOpen, setIsChatOpen] = useState(false)

  return (
    <div className="fixed bottom-8 right-4 z-30 flex flex-col items-end sm:bottom-8 sm:right-8">
      <Popover open={isChatOpen} onOpenChange={setIsChatOpen}>
        <PopoverTrigger asChild>
          <Button
            size="icon"
            className="h-12 w-12 rounded-full border border-primary p-3 shadow-xl transition-all duration-300 hover:scale-110"
            onClick={() => setIsChatOpen(true)}
            variant="outline"
          >
            {isChatOpen ? (
              <X size={24} color="hsl(var(--primary))" />
            ) : (
              <MessageCircle size={24} color="hsl(var(--primary))" />
            )}
          </Button>
        </PopoverTrigger>

        <PopoverContent className="mr-8 w-80">
          {isChatOpen && <LazyChatForm setIsChatOpen={setIsChatOpen} />}
        </PopoverContent>
      </Popover>
    </div>
  )
}
