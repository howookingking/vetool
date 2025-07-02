import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { toast } from '@/components/ui/use-toast'
import { updateOrderColorSettings } from '@/lib/services/admin/icu/order-color'
import { cn } from '@/lib/utils/utils'
import type { OrderColorDisplay } from '@/providers/basic-hos-data-context-provider'
import type { IcuOrderColors } from '@/types/adimin'
import type { SelectedIcuOrder } from '@/types/icu/chart'
import { LoaderCircle } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import { useState } from 'react'
import DefaultOrdersTable from '../default-orders/default-orders-table'
import OrderColorDisplayMethod from './color-display-method/color-display-method'
import OrderColorPickers from './color-picker/order-color-pickers'

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
    setLocalColorState({ ...localColorState, [orderType]: color })
  }

  const handleUpdateOrderColor = async () => {
    setIsUpdating(true)

    await updateOrderColorSettings(
      hos_id as string,
      localColorState,
      localColorDisplayMethod,
    )
    toast({
      title: '오더색상 & 표시방법을 변경하였습니다.',
    })

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

      <CardContent>
        <div className="flex flex-col gap-8">
          <DefaultOrdersTable
            defaultChartOrders={DUMMY_ORDERS}
            isSetting
            localColorState={localColorState}
            localColorDisplayMethod={localColorDisplayMethod}
            isOrderColorSetting
          />

          <OrderColorPickers
            handleOrderColor={handleOrderColor}
            localColorState={localColorState}
          />

          <OrderColorDisplayMethod
            setLocalColorDisplayMethod={setLocalColorDisplayMethod}
            localColorDisplayMethod={localColorDisplayMethod}
          />
        </div>
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

const DUMMY_ORDERS: SelectedIcuOrder[] = [
  {
    id: 0,
    order_type: 'checklist',
    is_bordered: false,
    order_comment: null,
    order_id: '0',
    order_name: '체크리스트',
    order_times: [
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
    ],
    treatments: [],
  },
  {
    id: 1,
    order_type: 'fluid',
    is_bordered: false,
    order_comment: null,
    order_id: '1',
    order_name: '수액',
    order_times: [
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
    ],
    treatments: [],
  },
  {
    id: 2,
    order_type: 'injection',
    is_bordered: false,
    order_comment: null,
    order_id: '2',
    order_name: '주사',
    order_times: [
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
    ],
    treatments: [],
  },
  {
    id: 3,
    order_type: 'po',
    is_bordered: false,
    order_comment: null,
    order_id: '3',
    order_name: '경구',
    order_times: [
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
    ],
    treatments: [],
  },

  {
    id: 4,
    order_type: 'test',
    is_bordered: false,
    order_comment: null,
    order_id: '4',
    order_name: '검사',
    order_times: [
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
    ],
    treatments: [],
  },

  {
    id: 5,
    order_type: 'feed',
    is_bordered: false,
    order_comment: null,
    order_id: '6',
    order_name: '식이',
    order_times: [
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
    ],
    treatments: [],
  },
  {
    id: 6,
    order_type: 'manual',
    is_bordered: false,
    order_comment: null,
    order_id: '5',
    order_name: '기타',
    order_times: [
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
    ],
    treatments: [],
  },
] as const
