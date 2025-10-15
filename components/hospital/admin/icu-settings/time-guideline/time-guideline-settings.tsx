import CellCheckbox from '@/components/hospital/admin/icu-settings/time-guideline/cell-checkbox'
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
import { Checkbox } from '@/components/ui/checkbox'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { TIMES } from '@/constants/hospital/icu/chart/time'
import { updateHosTimeGuidelines } from '@/lib/services/admin/icu/time-guidelines'
import { cn } from '@/lib/utils/utils'
import { useBasicHosDataContext } from '@/providers/basic-hos-data-context-provider'
import { IcuOrderColors } from '@/types/adimin'
import { LoaderCircle, RotateCcw } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'

type Props = {
  hosGuidelineData: number[]
  hosId: string
}

export function TimeGuideLinSettings({ hosGuidelineData, hosId }: Props) {
  const { refresh } = useRouter()

  const {
    basicHosData: { orderColorDisplay, orderColorsData, orderFontSizeData },
  } = useBasicHosDataContext()

  const [isUpdating, setIsUpdating] = useState(false)
  const [locaTimeGuideline, setLocalTimeGuideline] = useState(hosGuidelineData)

  const handleSubmit = async () => {
    setIsUpdating(true)

    await updateHosTimeGuidelines(hosId, locaTimeGuideline)

    toast.success('시간 가이드라인을 변경하였습니다')

    setIsUpdating(false)
    refresh()
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>시간 가이드라인</CardTitle>
        <CardDescription />
      </CardHeader>

      <CardContent>
        <Table className="border">
          <TableHeader className="bg-white shadow-sm">
            <TableRow>
              <TableHead className="w-[240px] text-center">오더목록</TableHead>
              {TIMES.map((time) => (
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
              <TableCell className="flex items-center justify-center gap-2 text-center">
                <span>초기화</span>
                <Button
                  className="h-8 w-8"
                  size="icon"
                  variant="outline"
                  onClick={() => setLocalTimeGuideline([])}
                  aria-label="시간 가이드라인 초기화"
                >
                  <RotateCcw />
                </Button>
              </TableCell>

              {TIMES.map((time) => (
                <CellCheckbox
                  key={time}
                  isGuidelineTime={locaTimeGuideline.includes(time)}
                  time={time}
                  setLocalTimeGuideline={setLocalTimeGuideline}
                />
              ))}
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

const TIME_GUIDELINES_SAMPLE_ORDERS = [
  {
    orderTitle: '혈압(BP)',
    orderComment: '도플러 #3 RA',
  },
  {
    orderTitle: '심박수(P)',
    orderComment: '',
  },
] as const
