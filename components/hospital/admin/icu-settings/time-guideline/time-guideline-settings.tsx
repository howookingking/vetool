import IcuSettingsCard from '@/components/hospital/admin/icu-settings/icu-settings-card'
import CellCheckbox from '@/components/hospital/admin/icu-settings/time-guideline/cell-checkbox'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { toast } from '@/components/ui/use-toast'
import { TIME_GUIDELINES_SAMPLE_ORDERS } from '@/constants/admin/admin-setting-items'
import { TIMES } from '@/constants/hospital/icu/chart/time'
import { updateHosTimeGuidelines } from '@/lib/services/admin/icu/time-guidelines'
import { cn } from '@/lib/utils/utils'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useBasicHosDataContext } from '@/providers/basic-hos-data-context-provider'
import OrderTypeColorDot from '@/components/hospital/common/order-type-color-dot'
import { IcuOrderColors } from '@/types/adimin'

export function TimeGuideLinSettings({
  hosGuidelineData,
  hosId,
}: {
  hosGuidelineData: number[]
  hosId: string
}) {
  const [isUpdating, setIsUpdating] = useState(false)
  const [locaTimeGuideline, setLocalTimeGuideline] = useState(hosGuidelineData)

  const { refresh } = useRouter()
  const {
    basicHosData: { orderColorDisplay, orderColorsData, orderFontSizeData },
  } = useBasicHosDataContext()

  const handleSubmit = async () => {
    setIsUpdating(true)

    await updateHosTimeGuidelines(hosId, locaTimeGuideline)
    toast({
      title: '시간 가이드라인을 변경하였습니다',
    })

    setIsUpdating(false)
    refresh()
  }

  return (
    <IcuSettingsCard
      title="시간 가이드라인"
      onSubmit={handleSubmit}
      isUpdating={isUpdating}
      cardWidth="w-full"
    >
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
                      ? orderColorsData['injection' as keyof IcuOrderColors]
                      : 'transparent',
                }}
              >
                <div className="flex items-center gap-2">
                  {orderColorDisplay === 'dot' && (
                    <OrderTypeColorDot
                      orderColorsData={orderColorsData}
                      orderType={'injection'}
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
    </IcuSettingsCard>
  )
}
