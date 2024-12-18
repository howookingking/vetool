'use client'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
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
import { updateHosTimeGuidelines } from '@/lib/services/admin/icu/time-guidelines'
import { cn } from '@/lib/utils/utils'
import { LoaderCircle } from 'lucide-react'
import { useState } from 'react'
import CellCheckbox from './cell-checkbox'

const SAMPLE_ORDERS = [
  {
    orderTitle: 'AMC IV',
    orderComment: '1ml',
  },
  {
    orderTitle: 'Esomeprazole SC',
    orderComment: '1ml',
  },
]

export function TimeGuideLinSettings({
  hosGuidelineData,
  hosId,
}: {
  hosGuidelineData: number[]
  hosId: string
}) {
  const [isUpdating, setIsUpdating] = useState(false)
  const [locaTimeGuideline, setLocalTimeGuideline] = useState(hosGuidelineData)

  const handleSubmit = async () => {
    setIsUpdating(true)
    await updateHosTimeGuidelines(hosId, locaTimeGuideline)
    toast({
      title: '시간 가이드라인을 변경하였습니다',
    })
    setIsUpdating(false)
  }

  return (
    <Card className="mt-2 w-full">
      <CardHeader>
        <CardTitle>시간 가이드라인</CardTitle>
      </CardHeader>

      <CardContent>
        <Table className="border">
          <TableHeader className="bg-white shadow-sm">
            <TableRow>
              <TableHead className="w-[200px] text-center">오더목록</TableHead>
              {TIMES.map((time) => (
                <TableHead key={time} className="border text-center">
                  {time.toString().padStart(2, '0')}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {SAMPLE_ORDERS.map((order) => (
              <TableRow
                key={order.orderTitle}
                className="relative w-full divide-x"
              >
                <TableCell className="flex justify-between bg-[#f0fdf4] font-medium">
                  <span>{order.orderTitle}</span>
                  <span className="text-right text-xs font-semibold text-muted-foreground">
                    {order.orderComment}
                  </span>
                </TableCell>
                {TIMES.map((time) => {
                  const isGuidelineTime = locaTimeGuideline.includes(time)
                  return (
                    <TableCell
                      key={time}
                      className={cn(isGuidelineTime && 'bg-amber-300/10')}
                    ></TableCell>
                  )
                })}
              </TableRow>
            ))}
            <TableRow className="relative w-full divide-x">
              <TableCell className="flex justify-between font-medium">
                선택
              </TableCell>
              {TIMES.map((time) => {
                return (
                  <CellCheckbox
                    key={time}
                    isGuidelineTime={locaTimeGuideline.includes(time)}
                    time={time}
                    setLocalTimeGuideline={setLocalTimeGuideline}
                  />
                )
              })}
            </TableRow>
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
