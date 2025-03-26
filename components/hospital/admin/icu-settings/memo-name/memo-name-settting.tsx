'use no memo'

import ChartMemos from '@/components/hospital/icu/main/chart/selected-chart/chart-body/chart-memos/chart-memos'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
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
import { memoNameFormSchema } from '@/lib/schemas/admin/admin-schema'
import { updateMemoNames } from '@/lib/services/admin/icu/memo-name'
import { cn } from '@/lib/utils/utils'
import { type Memo } from '@/types/icu/chart'
import { zodResolver } from '@hookform/resolvers/zod'
import { LoaderCircle } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const DUMMY_MEMO_A: Memo[] = [
  {
    color: '#fef9c3',
    id: '1',
    memo: 'memo A',
    create_timestamp: '2025-05-15T00:00:00.000Z',
    edit_timestamp: '',
  },
] as const

const DUMMY_MEMO_B: Memo[] = [
  {
    color: '#fce7f3',
    id: '1',
    memo: 'memo B',
    create_timestamp: '2025-05-15T00:00:00.000Z',
    edit_timestamp: '',
  },
] as const

const DUMMY_MEMO_C: Memo[] = [
  {
    color: '#d1fae5',
    id: '1',
    memo: 'memo C',
    create_timestamp: '2025-05-15T00:00:00.000Z',
    edit_timestamp: '',
  },
] as const

export default function MemoNameSetting({
  memoNames,
}: {
  memoNames: string[]
}) {
  const { hos_id } = useParams()
  const { refresh } = useRouter()

  const [isUpdating, setIsUpdating] = useState(false)

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
      title: '메모이름 변경완료',
    })

    setIsUpdating(false)
    refresh()
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <Card>
          <CardHeader>
            <CardTitle>메모 이름</CardTitle>
            <CardDescription>
              입원차트 하단의 메모이름을 변경할 수 있습니다
            </CardDescription>
          </CardHeader>

          <CardContent>
            <div className="mb-4 grid grid-cols-3 gap-2">
              <FormField
                control={form.control}
                name="memoA"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>첫 번째 메모이름</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="입원차트 첫번째 메모이름"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription />

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="memoB"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>두 번째 메모이름</FormLabel>
                    <FormControl>
                      <Input placeholder="메모 B" {...field} />
                    </FormControl>
                    <FormDescription />

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="memoC"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>세 번째 메모이름</FormLabel>
                    <FormControl>
                      <Input placeholder="메모 C" {...field} />
                    </FormControl>
                    <FormDescription />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <ChartMemos
              icuIoId="memo_name_setting"
              memoA={DUMMY_MEMO_A}
              memoB={DUMMY_MEMO_B}
              memoC={DUMMY_MEMO_C}
              isMemoNameSetting
            />
          </CardContent>

          <CardFooter>
            <Button type="submit" disabled={isUpdating}>
              저장
              <LoaderCircle
                className={cn(isUpdating ? 'ml-2 animate-spin' : 'hidden')}
                size={16}
              />
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  )
}
