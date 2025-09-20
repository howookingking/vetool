import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { updateOrderColorSettings } from '@/lib/services/admin/icu/order-color'
import { cn } from '@/lib/utils/utils'
import type { OrderColorDisplay } from '@/providers/basic-hos-data-context-provider'
import type { IcuOrderColors } from '@/types/adimin'
import { LoaderCircle } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import { useState } from 'react'
import OrderColorDisplayMethod from './color-display-method/color-display-method'
import OrderColorPickers from './color-picker/order-color-pickers'
import DisplayExampleTable from './display-example-table'
import { toast } from 'sonner'

type Props = {
  orderColorSettings: {
    order_color: IcuOrderColors
    order_color_display: OrderColorDisplay
  }
}

export default function OrderColorSettings({ orderColorSettings }: Props) {
  const { hos_id } = useParams()
  const { refresh } = useRouter()

  const [isUpdating, setIsUpdating] = useState(false)
  const [localColorState, setLocalColorState] = useState(
    orderColorSettings.order_color,
  )
  const [localColorDisplayMethod, setLocalColorDisplayMethod] = useState(
    orderColorSettings.order_color_display as OrderColorDisplay,
  )

  const handleOrderColor = (orderType: string, color: string) => {
    setLocalColorState((prev) => ({
      ...prev,
      [orderType]: color,
    }))
  }

  const handleUpdateOrderColor = async () => {
    setIsUpdating(true)

    await updateOrderColorSettings(
      hos_id as string,
      localColorState,
      localColorDisplayMethod,
    )

    toast.success('오더색상 & 표시방법을 변경하였습니다.')

    setIsUpdating(false)
    refresh()
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>오더색상 & 표시방법</CardTitle>
        <CardDescription>
          오더 타입별 색상과 표시 방법을 설정해주세요
        </CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col gap-8">
        <DisplayExampleTable
          localColorState={localColorState}
          localColorDisplayMethod={localColorDisplayMethod}
        />

        <OrderColorPickers
          handleOrderColor={handleOrderColor}
          localColorState={localColorState}
        />

        <OrderColorDisplayMethod
          setLocalColorDisplayMethod={setLocalColorDisplayMethod}
          localColorDisplayMethod={localColorDisplayMethod}
        />
      </CardContent>

      <CardFooter>
        <Button
          type="button"
          onClick={handleUpdateOrderColor}
          disabled={isUpdating}
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
