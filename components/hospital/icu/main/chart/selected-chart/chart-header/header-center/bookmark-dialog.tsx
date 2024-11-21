'use client'

import { bookmarkFormSchema } from '@/components/hospital/icu/main/chart/selected-chart/chart-header/header-center/weght-bookmark-schema'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { toast } from '@/components/ui/use-toast'
import {
  deleteTemplateChart,
  upsertTemplateChart,
} from '@/lib/services/icu/template/template'
import { cn } from '@/lib/utils/utils'
import type { IcuTemplate } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { Edit, LoaderCircle, Star } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

export default function BookmarkDialog({
  icuChartId,
  bookmarkData,
  icon,
}: {
  icuChartId: string
  bookmarkData: Pick<
    IcuTemplate,
    'template_id' | 'template_name' | 'template_comment'
  > | null
  icon: 'star' | 'edit'
}) {
  const { hos_id } = useParams()
  const { refresh } = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const form = useForm<z.infer<typeof bookmarkFormSchema>>({
    resolver: zodResolver(bookmarkFormSchema),
    defaultValues: {
      bookmark_name: bookmarkData?.template_name ?? undefined,
      bookmark_comment: bookmarkData?.template_comment ?? undefined,
    },
  })

  const handleSubmit = async (values: z.infer<typeof bookmarkFormSchema>) => {
    setIsSubmitting(true)

    await upsertTemplateChart(
      values.bookmark_name,
      values.bookmark_comment ?? '',
      icuChartId,
      hos_id as string,
    )

    toast({
      title: `북마크를 ${bookmarkData?.template_id!! ? '수정' : '생성'}하였습니다`,
    })

    refresh()
    setIsSubmitting(false)
    setIsDialogOpen(false)
  }

  const handleDelete = async () => {
    setIsDeleting(true)

    await deleteTemplateChart(bookmarkData?.template_id!)

    toast({
      title: `${bookmarkData?.template_name} 북마크가 삭제되었습니다`,
    })

    refresh()
    setIsDeleting(false)
    setIsDialogOpen(false)
  }

  useEffect(() => {
    if (!isDialogOpen) {
      form.reset({
        bookmark_name: bookmarkData?.template_name || undefined,
        bookmark_comment: bookmarkData?.template_comment || undefined,
      })
    }
  }, [
    bookmarkData?.template_comment,
    bookmarkData?.template_name,
    form,
    isDialogOpen,
  ])

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger>
        {icon === 'star' && (
          <Star
            className={cn(
              'text-amber-300',
              bookmarkData?.template_id!! && 'fill-amber-300',
            )}
          />
        )}
        {icon === 'edit' && <Edit size={18} />}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {`차트 북마크 ${bookmarkData?.template_id!! ? '수정' : '생성'}`}
          </DialogTitle>
          <DialogDescription />
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="bookmark_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>북마크 이름*</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      value={field.value || ''}
                      placeholder="북마크 이름을 입력해주세요"
                      autoComplete="off"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="bookmark_comment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>설명</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      value={field.value || ''}
                      placeholder="설명을 입력해주세요"
                      autoComplete="off"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex">
              {bookmarkData?.template_id!! && (
                <Button
                  type="button"
                  variant="destructive"
                  disabled={isDeleting}
                  className="mr-auto"
                  onClick={handleDelete}
                >
                  삭제
                  <LoaderCircle
                    className={cn(isDeleting ? 'ml-2 animate-spin' : 'hidden')}
                  />
                </Button>
              )}

              <div className="ml-auto">
                <DialogClose asChild>
                  <Button type="button" variant="outline" tabIndex={-1}>
                    닫기
                  </Button>
                </DialogClose>
                <Button type="submit" disabled={isSubmitting} className="ml-2">
                  저장
                  <LoaderCircle
                    className={cn(
                      isSubmitting ? 'ml-2 animate-spin' : 'hidden',
                    )}
                  />
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
