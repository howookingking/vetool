import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  chartSchema,
  type ChatFormValues,
} from '@/lib/schemas/company/chat-schema'
import { sendFeedback } from '@/lib/services/super/feedback/feedback'
import { cn } from '@/lib/utils/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { LoaderCircle, X } from 'lucide-react'
import { useState, type Dispatch, type SetStateAction } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from '@/components/ui/use-toast'

export default function ChatForm({
  setIsChatOpen,
}: {
  setIsChatOpen: Dispatch<SetStateAction<boolean>>
}) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<ChatFormValues>({
    resolver: zodResolver(chartSchema),
    defaultValues: {
      email: '',
      hospital: '',
      message: '',
    },
  })

  const onSubmit = async (data: ChatFormValues) => {
    setIsSubmitting(true)

    await sendFeedback(
      '홈페이지 문의사항',
      [data.email, data.hospital, data.message].join(' '),
    )

    toast({
      title: '전송 완료',
      description:
        '기재하신 이메일로 벳툴팀이 최대한 빠르게 답장을 드리겠습니다',
    })

    setIsSubmitting(false)
  }

  return (
    <>
      <div className="mb-2 flex items-center justify-between border-b pb-2">
        <span className="text-lg font-semibold">문의하기</span>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsChatOpen(false)}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-1 flex-col gap-4"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>이메일</FormLabel>
                <FormControl>
                  <Input
                    placeholder="답장 받을 이메일을 입력해주세요"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="hospital"
            render={({ field }) => (
              <FormItem>
                <FormLabel>소속 병원 (또는 성함)</FormLabel>
                <FormControl>
                  <Input
                    placeholder="소속 병원 또는 성함을 입력해주세요"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>문의사항</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="벳툴팀에 남겨주실 문의사항을 입력해주세요"
                    className="resize-none"
                    rows={5}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="mt-auto">
            <Button
              type="submit"
              className="w-full"
              disabled={!form.formState.isValid || isSubmitting}
            >
              전송
              <LoaderCircle
                className={cn(isSubmitting ? 'ml-2 animate-spin' : 'hidden')}
              />
            </Button>
          </div>
        </form>
      </Form>
    </>
  )
}
