'use client'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { getUser } from '@/lib/services/auth/authorization'
import { sendErrorFeedback } from '@/lib/services/error-feedback/error-feedback'
import { cn } from '@/lib/utils/utils'
import {
  AlertCircle,
  CheckCircle2,
  Home,
  LoaderCircle,
  Send,
} from 'lucide-react'
import { useRouter } from 'next/navigation'
import { use, useEffect, useState } from 'react'

export default function ErrorPage(props: {
  searchParams: Promise<{ message: string; hosId: string }>
}) {
  const searchParams = use(props.searchParams)
  const { message, hosId } = searchParams
  const { replace } = useRouter()
  const [userId, setUserId] = useState<string>()
  const [description, setDescription] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  useEffect(() => {
    const getUserId = async () => {
      const user = await getUser()
      setUserId(user?.id)
    }
    getUserId()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const errorInfo = {
      message,
    }

    setIsSubmitting(true)

    await sendErrorFeedback(
      userId!,
      description,
      false,
      JSON.stringify(errorInfo),
    )

    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-primary/10 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl font-bold text-rose-500">
            <AlertCircle className="h-6 w-6" />
            에러 발생
          </CardTitle>
          <CardDescription>
            의도치 않은 에러가 발생하였습니다
            <br />
            피드백을 주시면 빠르게 처리하겠습니다
          </CardDescription>
        </CardHeader>
        <CardContent className="pb-2">
          {!isSubmitted ? (
            <form onSubmit={handleSubmit}>
              <Label htmlFor="description">
                어떤 작업 중 에러가 발생했나요?
              </Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                className="mb-6 mt-1"
              />
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                <Send />
                피드백
                <LoaderCircle
                  className={cn(isSubmitting ? 'animate-spin' : 'hidden')}
                />
              </Button>
            </form>
          ) : (
            <div className="space-y-2 text-center">
              <CheckCircle2 className="mx-auto h-12 w-12 text-primary" />
              <p className="text-lg font-semibold">피드백 감사드립니다</p>
            </div>
          )}
        </CardContent>

        <CardFooter className="justify-center gap-2">
          <Button
            className="w-full"
            variant="outline"
            onClick={() => replace('/')}
          >
            <Home />
            홈으로
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
