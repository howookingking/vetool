import SubmitButton from '@/components/common/submit-button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { updateOrderColorSettings } from '@/lib/services/admin/icu/order-color'
import type { IcuOrderColors } from '@/types/adimin'
import { useParams, useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'
import DisplayExampleTable from './display-example-table'
import OrderColorPickers from './order-color-pickers'

type Props = {
  order_color: IcuOrderColors
}

export default function OrderColorSettings({ order_color }: Props) {
  const { hos_id } = useParams()
  const { refresh } = useRouter()

  const [isUpdating, setIsUpdating] = useState(false)
  const [localColorState, setLocalColorState] = useState(order_color)

  const handleOrderColor = (orderType: string, color: string) => {
    setLocalColorState((prev) => ({
      ...prev,
      [orderType]: color,
    }))
  }

  const handleUpdateOrderColor = async () => {
    setIsUpdating(true)

    await updateOrderColorSettings(hos_id as string, localColorState)

    toast.success('오더타입별 색상을 변경하였습니다.')

    setIsUpdating(false)
    refresh()
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>오더색상</CardTitle>
        <CardDescription>오더타입별 색상을 설정해주세요</CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col gap-8">
        <DisplayExampleTable localColorState={localColorState} />

        <OrderColorPickers
          handleOrderColor={handleOrderColor}
          localColorState={localColorState}
        />
      </CardContent>

      <CardFooter>
        <SubmitButton
          buttonText="저장"
          onClick={handleUpdateOrderColor}
          isPending={isUpdating}
        />
      </CardFooter>
    </Card>
  )
}
