import { toast } from '@/components/ui/use-toast'
import { DEFAULT_ICU_ORDER_TYPE } from '@/constants/hospital/icu/chart/order'
import { updateOrderColorSettings } from '@/lib/services/admin/icu/order-color'
import type { IcuOrderColors } from '@/types/adimin'
import { useParams, useRouter } from 'next/navigation'
import { useState } from 'react'
import IcuSettingsCard from '../icu-settings-card'
import OrderColorDisplayMethod from './color-display-method/color-display-method'
import OrderColorPickers from './color-picker/order-color-pickers'
import TableDisplay from './table-display'

export default function OrderColorSettings({
  orderColorSettings,
}: {
  orderColorSettings: {
    order_color: IcuOrderColors
    order_color_display: string
  }
}) {
  const [isUpdating, setIsUpdating] = useState(false)
  const [localColorState, setLocalColorState] = useState(
    orderColorSettings.order_color,
  )
  const [localColorDisplayMethod, setLocalColorDisplayMethod] = useState(
    orderColorSettings.order_color_display,
  )

  const { hos_id } = useParams()
  const { refresh } = useRouter()

  const handleOrderColor = (orderType: string, color: string) => {
    setLocalColorState({ ...localColorState, [orderType]: color })
  }

  const handleOrderColorDisplayMethod = (method: string) => {
    setLocalColorDisplayMethod(method)
  }

  const handleUpdateOrderColor = async () => {
    setIsUpdating(true)

    await updateOrderColorSettings(
      hos_id as string,
      localColorState,
      localColorDisplayMethod,
    )
    toast({
      title: '오더의 색상을 변경하였습니다.',
    })

    setIsUpdating(false)
    refresh()
  }

  const sortedOrders = Object.entries(localColorState).sort((a, b) => {
    return (
      DEFAULT_ICU_ORDER_TYPE.map((order) => order.value).findIndex(
        (order) => order === a[0],
      ) -
      DEFAULT_ICU_ORDER_TYPE.map((order) => order.value).findIndex(
        (order) => order === b[0],
      )
    )
  })

  return (
    <IcuSettingsCard
      title="오더색상 & 표시 방법"
      description="오더 타입별 색상과 표시 방법을 설정해주세요"
      isUpdating={isUpdating}
      onSubmit={handleUpdateOrderColor}
    >
      <div className="flex flex-col gap-8">
        <TableDisplay
          localColorState={localColorState}
          localColorDisplayMethod={localColorDisplayMethod}
        />

        <OrderColorPickers
          handleOrderColor={handleOrderColor}
          sortedOrders={sortedOrders}
        />

        <OrderColorDisplayMethod
          handleOrderColorDisplayMethod={handleOrderColorDisplayMethod}
          localColorDisplayMethod={localColorDisplayMethod}
        />
      </div>
    </IcuSettingsCard>
  )
}
