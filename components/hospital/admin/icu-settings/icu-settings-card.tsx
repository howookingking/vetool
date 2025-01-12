import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { cn } from '@/lib/utils/utils'
import { LoaderCircle } from 'lucide-react'
import { ReactNode } from 'react'

export default function IcuSettingsCard({
  children,
  title,
  description,
  onSubmit,
  isUpdating,
  buttonName = '저장',
  cardWidth = 'sm:w-1/2',
}: {
  children: ReactNode
  title: string
  description?: string
  onSubmit: () => void
  isUpdating?: boolean
  buttonName?: string
  cardWidth?: string
}) {
  return (
    <Card className={cn('mt-2', cardWidth)}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>

      <CardContent>{children}</CardContent>
      <CardFooter>
        <Button
          type="button"
          onClick={onSubmit}
          disabled={isUpdating}
          className="ml-auto md:ml-0 md:mr-auto"
        >
          {buttonName}
          <LoaderCircle
            className={cn(isUpdating ? 'ml-2 animate-spin' : 'hidden')}
            size={16}
          />
        </Button>
      </CardFooter>
    </Card>
  )
}
