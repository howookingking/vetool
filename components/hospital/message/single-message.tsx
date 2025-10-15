import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { cn } from '@/lib/utils/utils'
import { Message } from '@/types'

type Props = {
  message: Message
  isSender: boolean
}

export default function SingleMessage({ message, isSender }: Props) {
  return (
    <div className={cn('flex gap-2', isSender && 'justify-end')}>
      <Avatar className="h-8 w-8">
        <AvatarImage src={message.avatar_url} alt={message.user_name} />
        <AvatarFallback>{message.user_name}</AvatarFallback>
      </Avatar>

      <div className={cn('flex flex-col gap-0.5')}>
        <div className="flex items-center gap-1">
          <span className="text-sm font-semibold">{message.user_name}</span>
          <span className="text-xs text-muted-foreground">
            ({message.position})
          </span>
        </div>

        <div className={cn('flex', isSender && 'justify-end')}>
          <div
            className={cn(
              isSender ? 'bg-yellow-300' : 'bg-white',
              'max-w-xs whitespace-pre-wrap rounded-lg px-3 py-2 text-sm',
            )}
          >
            <p className="">{message.content}</p>
          </div>
        </div>

        <div className={cn('flex', isSender && 'justify-end')}>
          <span className={cn('text-xs text-muted-foreground')}>
            {new Date(message.created_at).toLocaleTimeString()}
          </span>
        </div>
      </div>
    </div>
  )
}
