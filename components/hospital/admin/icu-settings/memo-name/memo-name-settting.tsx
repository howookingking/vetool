'use client'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { toast } from '@/components/ui/use-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { useParams, useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { memoNameFormSchema } from './memo-name-schema'
import { updateMemoNames } from '@/lib/services/admin/icu/memo-name'
import { useState } from 'react'
import { LoaderCircle } from 'lucide-react'
import { cn } from '@/lib/utils/utils'

export default function MemoNameSetting({
  memoNames,
}: {
  memoNames: string[]
}) {
  const [isUpdating, setIsUpdating] = useState(false)
  const { hos_id } = useParams()
  const { refresh } = useRouter()

  const memoA = memoNames[0]
  const memoB = memoNames[1]
  const memoC = memoNames[2]

  const form = useForm<z.infer<typeof memoNameFormSchema>>({
    resolver: zodResolver(memoNameFormSchema),
    defaultValues: {
      memoA,
      memoB,
      memoC,
    },
  })

  const handleSubmit = async (values: z.infer<typeof memoNameFormSchema>) => {
    const { memoA, memoB, memoC } = values
    const updatedMemoNames = [memoA, memoB, memoC]

    if (
      updatedMemoNames[0] === memoNames[0] &&
      updatedMemoNames[1] === memoNames[1] &&
      updatedMemoNames[2] === memoNames[2]
    ) {
      return
    }
    setIsUpdating(true)

    await updateMemoNames(updatedMemoNames, hos_id as string)

    toast({
      title: '메모명 변경',
      description: '메모명 변경이 완료되었습니다',
    })

    setIsUpdating(false)
    refresh()
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="w-full space-y-4 py-4"
      >
        <FormField
          control={form.control}
          name="memoA"
          render={({ field }) => (
            <FormItem>
              <FormLabel>첫번째 메모이름</FormLabel>
              <FormControl>
                <Input placeholder="입원차트 첫번째 메모이름" {...field} />
              </FormControl>
              <FormDescription>
                입원 차트의 첫번째 메모입력란의 이름에 해당합니다
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="memoB"
          render={({ field }) => (
            <FormItem>
              <FormLabel>두번째 메모이름</FormLabel>
              <FormControl>
                <Input placeholder="메모 B" {...field} />
              </FormControl>
              <FormDescription>
                입원 차트의 두번째 메모입력란의 이름에 해당합니다
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="memoC"
          render={({ field }) => (
            <FormItem>
              <FormLabel>세번째 메모이름</FormLabel>
              <FormControl>
                <Input placeholder="메모 C" {...field} />
              </FormControl>
              <FormDescription>
                입원 차트의 세번째 메모입력란의 이름에 해당합니다
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="ml-auto" disabled={isUpdating}>
          저장
          <LoaderCircle
            className={cn(isUpdating ? 'ml-2 animate-spin' : 'hidden')}
          />
        </Button>
      </form>
    </Form>
  )
}
