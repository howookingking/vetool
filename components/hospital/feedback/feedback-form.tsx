import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { toast } from '@/components/ui/use-toast'
import { sendFeedback } from '@/lib/services/feedback/feedback'
import { cn } from '@/lib/utils/utils'
import { LoaderCircle } from 'lucide-react'
import { Dispatch, SetStateAction, useState } from 'react'
import {
  FEEDBACK_CATEGORY_ENUM,
  feedbackFormSchema,
} from './feedback-form-schema'

export default function FeedbackForm({
  setIsPopoverFeedbackOpen,
}: {
  setIsPopoverFeedbackOpen: Dispatch<SetStateAction<boolean>>
}) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<z.infer<typeof feedbackFormSchema>>({
    resolver: zodResolver(feedbackFormSchema),
    defaultValues: {
      feedback_category: FEEDBACK_CATEGORY_ENUM[0],
      feedback_description: '',
    },
  })

  const onSubmit = async (data: z.infer<typeof feedbackFormSchema>) => {
    setIsSubmitting(true)

    await sendFeedback(data.feedback_category, data.feedback_description)

    setIsSubmitting(false)
    toast({
      title: '피드백 주셔서 감사합니다',
    })
    setIsPopoverFeedbackOpen(false)
  }
  return (
    <>
      <h3 className="mb-2 text-center text-lg font-semibold">사용자 피드백</h3>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          <FormField
            control={form.control}
            name="feedback_category"
            render={({ field }) => (
              <FormItem>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a verified email to display" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {FEEDBACK_CATEGORY_ENUM.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="feedback_description"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    placeholder="에러 리포트, 불편사항, 수의학 키워드 추가 등..."
                    className="resize-none"
                    {...field}
                    rows={5}
                  />
                </FormControl>
                <FormDescription>검토 후 빠르게 반영하겠습니다</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isSubmitting} className="w-full">
            전송
            <LoaderCircle
              className={cn(isSubmitting ? 'ml-2 animate-spin' : 'hidden')}
            />
          </Button>
        </form>
      </Form>
    </>
  )
}
