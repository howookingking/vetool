import OrderTypeColorDot from '@/components/hospital/common/order-type-color-dot'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { toast } from '@/components/ui/use-toast'
import {
  CHECKLIST_ORDER_CANDIDATES,
  CHECKLIST_ORDERS,
  DEFAULT_ICU_ORDER_TYPE,
} from '@/constants/hospital/icu/chart/order'
import { upsertOrder } from '@/lib/services/icu/chart/order-mutation'
import { useIcuOrderStore } from '@/lib/store/icu/icu-order'
import { useBasicHosDataContext } from '@/providers/basic-hos-data-context-provider'
import type { SelectedIcuOrder } from '@/types/icu/chart'
import { Plus } from 'lucide-react'
import { useParams } from 'next/navigation'
import { Dispatch, SetStateAction, useState } from 'react'

type QuickOrderInsertInputProps = {
  icuChartId: string
  setSortedOrders: Dispatch<SetStateAction<SelectedIcuOrder[]>>
}

export default function QuickOrderInsertInput({
  icuChartId,
  setSortedOrders,
}: QuickOrderInsertInputProps) {
  const {
    basicHosData: { orderColorsData },
  } = useBasicHosDataContext()
  const { setOrderStep } = useIcuOrderStore()
  const { hos_id } = useParams()

  const [quickOrderInput, setQuickOrderInput] = useState('')
  const [orderType, setOrderType] = useState('manual')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isChecklistOrder, setIsChecklistOrder] = useState(false)

  const createOrder = async (orderName: string, orderDescription: string) => {
    const emptyOrderTimes = Array(24).fill('0')

    // 빠른 오더를 생성하고, 기존 오더 배열에 추가
    const newOrder = {
      id: 1,
      order_id: `temp_order_id_${new Date().getTime()}`,
      order_name: orderName.trim(),
      order_comment: orderDescription ? orderDescription.trim() : '',
      order_type: orderType,
      order_times: emptyOrderTimes,
      treatments: [],
      is_bordered: false,
    }

    setSortedOrders((prev) => [...prev, newOrder])

    // 빠른 오더가 포함된 오더를 UPSERT
    await upsertOrder(
      hos_id as string,
      icuChartId,
      undefined,
      emptyOrderTimes,
      {
        icu_chart_order_name: orderName.trim(),
        icu_chart_order_comment: orderDescription
          ? orderDescription.trim()
          : '',
        icu_chart_order_type: orderType,
      },
    )

    toast({
      title: `${orderName} 오더를 생성하였습니다`,
    })

    setQuickOrderInput('')
    setIsSubmitting(false)
    setIsChecklistOrder(false)
  }

  const handleSubmit = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    // '체중' 입력 -> '체중중' 오류
    if (e.nativeEvent.isComposing || e.key !== 'Enter') return
    if (!quickOrderInput) return

    const [orderName, orderDescription] = quickOrderInput.split('$')

    // 체크리스트의 INPUT을 입력했을 경우(혈당, bg, 혈압 등...)
    if (
      CHECKLIST_ORDER_CANDIDATES.some((name) =>
        name.includes(orderName.toLowerCase()),
      )
    ) {
      setIsChecklistOrder(true)
      setOrderType('checklist')
      setQuickOrderInput('')
      return
    }

    setIsSubmitting(true)
    await createOrder(orderName, orderDescription ?? '')
  }

  const handleOrderTypeChange = async (selectedValue: string) => {
    setOrderType(selectedValue)
    setIsChecklistOrder(false)

    if (selectedValue === 'template') {
      setOrderStep('upsert')
      setOrderType('manual')
      return
    }
  }

  // 체크리스트 SELECT onChange
  const handleCheckListValueChange = async (selectedValue: string) => {
    setQuickOrderInput(selectedValue)

    await createOrder(selectedValue, '')
  }

  return (
    <div className="relative hidden w-full items-center md:flex">
      <Select onValueChange={handleOrderTypeChange} value={orderType}>
        <SelectTrigger className="h-11 w-[128px] shrink-0 rounded-none border-0 border-r px-2 shadow-none ring-0 focus:ring-0">
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="p-0">
          {DEFAULT_ICU_ORDER_TYPE.map((item) => (
            <SelectItem
              key={item.value}
              value={item.value}
              className="rounded-none p-1 transition hover:opacity-70"
            >
              <div className="flex items-center gap-2">
                <OrderTypeColorDot
                  orderType={item.value}
                  orderColorsData={orderColorsData}
                />
                <span>{item.label}</span>
              </div>
            </SelectItem>
          ))}

          <SelectItem
            value="template"
            className="rounded-none p-1 transition hover:opacity-70"
          >
            <div className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              <span>템플릿</span>
            </div>
          </SelectItem>
        </SelectContent>
      </Select>

      {orderType === 'checklist' && (
        <Select onValueChange={handleCheckListValueChange}>
          <SelectTrigger className="h-11 w-full rounded-none border-0 border-r ring-0 focus-visible:ring-0">
            <SelectValue placeholder="체크리스트 항목 선택" />
          </SelectTrigger>

          <SelectContent>
            {CHECKLIST_ORDERS.map((order) => (
              <SelectItem key={order} value={order}>
                {order}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}

      {orderType !== 'checklist' && (
        <Input
          className="h-11 rounded-none border-0 border-r focus-visible:ring-0"
          disabled={isSubmitting}
          placeholder="오더명$오더설명"
          value={isSubmitting ? '등록 중' : quickOrderInput}
          onChange={(e) => setQuickOrderInput(e.target.value)}
          onKeyDown={handleSubmit}
        />
      )}

      {isChecklistOrder && (
        <span className="absolute -bottom-5 right-3 text-xs text-destructive">
          해당 오더는 체크리스트에 존재합니다
        </span>
      )}
    </div>
  )
}
