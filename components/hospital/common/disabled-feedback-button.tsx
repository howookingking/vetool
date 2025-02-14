import { Button } from '@/components/ui/button'
import { MessageCircle } from 'lucide-react'

export default function DisabledFeedbackButton() {
  return (
    <Button
      variant="outline"
      size="icon"
      className="cursor-default rounded-full"
    >
      <MessageCircle />
    </Button>
  )
}
