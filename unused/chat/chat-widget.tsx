'use client'

import LargeLoaderCircle from '@/components/common/large-loader-circle'
import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { MessageCircle, X } from 'lucide-react'
import { useState } from 'react'
import ChatForm from './chat-form'

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
          <ChatForm setIsChatOpen={setIsChatOpen} />
        </PopoverContent>
      </Popover>
    </div>
  )
}
