'use client'

import OrderTypeColorDot from '@/components/hospital/common/order/order-type-color-dot'
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
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { toast } from '@/components/ui/use-toast'
import { TIMES } from '@/constants/hospital/icu/chart/time'
import { updateBaselineTime } from '@/lib/services/admin/icu/baseline-time'
import { cn } from '@/lib/utils/utils'
import { useBasicHosDataContext } from '@/providers/basic-hos-data-context-provider'
import { IcuOrderColors } from '@/types/adimin'
import { LoaderCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export const TIME_GUIDELINES_SAMPLE_ORDERS = [
  {
    orderTitle: '혈압(BP)',
    orderComment: '도플러 RA #3',
  },
  {
    orderTitle: '심박수(P)',
    orderComment: '',
  },
] as const

type Props = {
  hosId: string
}

export default function BaselineTimeTab({ hosId }: Props) {
  const { refresh } = useRouter()

  const {
    basicHosData: {
      baselineTime,
      orderFontSizeData,
      orderColorsData,
      orderColorDisplay,
      timeGuidelineData,
    },
  } = useBasicHosDataContext()

  const [localBaselineTime, setLocalBaselineTime] = useState(
    baselineTime.toString(),
  )

  const [isUpdating, setIsUpdating] = useState(false)
  //   const [locaTimeGuideline, setLocalTimeGuideline] = useState(hosGuidelineData)

  const handleSubmit = async () => {
    setIsUpdating(true)

    await updateBaselineTime(hosId, Number(localBaselineTime))

    toast({
      title: '시간 가이드라인을 변경하였습니다',
    })

    setIsUpdating(false)
    refresh()
  }

  const newTime = new Array(24)
    .fill(0)
    .map((_, i) => (Number(localBaselineTime) + i) % 24)

  return (
    <Card>
      <CardHeader>
        <CardTitle>일 기준 시간</CardTitle>
        <CardDescription>
          하루의 시작이 되는 기준 시간을 설정합니다.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <Select value={localBaselineTime} onValueChange={setLocalBaselineTime}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="기준 시간" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>기준 시간</SelectLabel>
              <SelectItem value="18">기준일 전날 18시</SelectItem>
              <SelectItem value="19">기준일 전날 19시</SelectItem>
              <SelectItem value="20">기준일 전날 20시</SelectItem>
              <SelectItem value="21">기준일 전날 21시</SelectItem>
              <SelectItem value="22">기준일 전날 22시</SelectItem>
              <SelectItem value="23">기준일 전날 23시</SelectItem>
              <SelectItem value="0">기준일 0시 (기본값)</SelectItem>
              <SelectItem value="1">기준일 1시</SelectItem>
              <SelectItem value="2">기준일 2시</SelectItem>
              <SelectItem value="3">기준일 3시</SelectItem>
              <SelectItem value="4">기준일 4시</SelectItem>
              <SelectItem value="5">기준일 5시</SelectItem>
              <SelectItem value="6">기준일 6시</SelectItem>
              <SelectItem value="6">기준일 6시</SelectItem>
              <SelectItem value="7">기준일 7시</SelectItem>
              <SelectItem value="8">기준일 8시</SelectItem>
              <SelectItem value="9">기준일 9시</SelectItem>
              <SelectItem value="10">기준일 10시</SelectItem>
              <SelectItem value="11">기준일 11시</SelectItem>
              <SelectItem value="12">기준일 12시</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        <Table className="border">
          <TableHeader className="bg-white shadow-sm">
            <TableRow>
              <TableHead className="w-[240px] text-center">오더목록</TableHead>
              {newTime.map((time) => (
                <TableHead key={time} className="border text-center">
                  {time.toString().padStart(2, '0')}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody>
            {TIME_GUIDELINES_SAMPLE_ORDERS.map((order) => (
              <TableRow
                key={order.orderTitle}
                className="relative w-full divide-x"
              >
                <TableCell
                  className="flex justify-between font-medium"
                  style={{
                    background:
                      orderColorDisplay === 'full'
                        ? orderColorsData['checklist' as keyof IcuOrderColors]
                        : 'transparent',
                  }}
                >
                  <div className="flex items-center gap-2">
                    {orderColorDisplay === 'dot' && (
                      <OrderTypeColorDot
                        orderColorsData={orderColorsData}
                        orderType={'checklist'}
                      />
                    )}
                    <span style={{ fontSize: `${orderFontSizeData}px` }}>
                      {order.orderTitle}
                    </span>
                  </div>

                  <span
                    className="text-right text-xs font-semibold text-muted-foreground"
                    style={{ fontSize: `${orderFontSizeData - 2}px` }}
                  >
                    {order.orderComment}
                  </span>
                </TableCell>

                {TIMES.map((time) => {
                  return (
                    <TableCell
                      key={time}
                      className={cn(
                        timeGuidelineData.includes(time) && 'bg-amber-300/10',
                      )}
                    ></TableCell>
                  )
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <Button
          type="button"
          onClick={handleSubmit}
          disabled={isUpdating}
          className="ml-auto md:ml-0 md:mr-auto"
        >
          저장
          <LoaderCircle
            className={cn(isUpdating ? 'ml-2 animate-spin' : 'hidden')}
            size={16}
          />
        </Button>
      </CardFooter>
    </Card>
  )
}
