'use client'
'use no memo'

import DeleteNoticeButton from '@/components/hospital/home/body/notice/delete-notice-button'
import { Button } from '@/components/ui/button'
import {
  Dialog,
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
import { NOTICE_COLORS } from '@/constants/hospital/icu/chart/colors'
import { noticeSchema } from '@/lib/schemas/icu/icu-schema'
import { createNotice, updateNotice } from '@/lib/services/hospital-home/notice'
import { cn } from '@/lib/utils/utils'
import { type NoticeColorType } from '@/types/hospital/notice'
import { zodResolver } from '@hookform/resolvers/zod'
import { Edit, LoaderCircle, Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

type UpsertNoticeDialogProps = {
  hosId: string
  isEdit?: boolean
  oldNoticeId?: string
  oldNoticeText?: string
  oldNoticeColor?: NoticeColorType
}

export default function UpsertNoticeDialog({
  hosId,
  isEdit,
  oldNoticeText,
  oldNoticeColor,
  oldNoticeId,
}: UpsertNoticeDialogProps) {
  const { refresh } = useRouter()

  const form = useForm<z.infer<typeof noticeSchema>>({
    resolver: zodResolver(noticeSchema),
    defaultValues: {
      notice: oldNoticeText ?? '',
      color: oldNoticeColor ?? '#ffffff',
    },
  })

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleUpsertNotice = async (values: z.infer<typeof noticeSchema>) => {
    const { color, notice } = values
    setIsSubmitting(true)

    isEdit
      ? await updateNotice(oldNoticeId!, notice, color)
      : await createNotice(notice, color, hosId)

    toast({
      title: isEdit ? '공지사항을 수정하였습니다' : '공지사항을 추가하였습니다',
    })
    refresh()
    setIsDialogOpen(false)
    setIsSubmitting(false)
  }

  const handleOpenChange = (open: boolean) => {
    if (open) {
      form.reset({
        notice: oldNoticeText ?? '',
        color: oldNoticeColor ?? '#ffffff',
      })
    }
    setIsDialogOpen(open)
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        {isEdit ? (
          <Button size="icon" className="h-6 w-6" variant="ghost">
            <Edit
              style={{
                width: '14px',
                height: '14px',
              }}
            />
          </Button>
        ) : (
          <Button
            variant="default"
            size="icon"
            className="h-6 w-6 rounded-full"
          >
            <Plus size={14} />
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle>
            {isEdit ? '공지사항 수정' : '공지사항 추가'}
          </DialogTitle>
          <DialogDescription>
            {isEdit
              ? '공지사항을 수정해주세요'
              : '새로운 공지사항을 추가해주세요'}{' '}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleUpsertNotice)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="notice"
              render={({ field }) => (
                <FormItem className="col-span-4">
                  <FormControl>
                    <Textarea
                      {...field}
                      className="h-8 text-sm"
                      autoComplete="off"
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="color"
              render={({ field }) => (
                <FormItem className="cols-span-1">
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    name="color"
                  >
                    <FormControl>
                      <SelectTrigger
                        className={cn(
                          'w-32',
                          !field.value && 'text-muted-foreground',
                        )}
                      >
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {NOTICE_COLORS.map((color) => (
                        <SelectItem
                          value={color}
                          key={color}
                          className="w-full"
                        >
                          <div
                            style={{ backgroundColor: color }}
                            className="h-4 w-4 rounded-full border"
                          />
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="col-span-5 mt-2 flex justify-between">
              <div>
                {isEdit && (
                  <DeleteNoticeButton
                    noticeId={oldNoticeId!}
                    setIsDialogOpen={setIsDialogOpen}
                  />
                )}
              </div>

              <div>
                <Button
                  type="button"
                  variant="outline"
                  tabIndex={-1}
                  onClick={() => setIsDialogOpen(false)}
                >
                  취소
                </Button>

                <Button type="submit" className="ml-2" disabled={isSubmitting}>
                  {isEdit ? '수정' : '등록'}
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
