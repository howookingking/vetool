import OrderRadioItem from '@/components/hospital/admin/icu-settings/order-font-size/order-radio-item'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { RadioGroup } from '@/components/ui/radio-group'
import { updateOrderFontSize } from '@/lib/services/admin/icu/order-font-size'
import { cn } from '@/lib/utils/utils'
import { LoaderCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'

type Props = {
  hosId: string
  orderFontSize: number
}

export default function OrderFontSetting({ hosId, orderFontSize }: Props) {
  const { refresh } = useRouter()

  const [isUpdating, setIsUpdating] = useState(false)
  const [selectedFontSize, setSelectedFontSize] = useState(
    orderFontSize.toString(),
  )

  const handleUpdateOrderFontSize = async () => {
    setIsUpdating(true)

    await updateOrderFontSize(hosId, selectedFontSize)

    toast.success('오더 글자 크기를 변경하였습니다')

    setIsUpdating(false)
    refresh()
  }

  return (
    <Card className="w-1/2">
      <CardHeader>
        <CardTitle>오더 글자 크기</CardTitle>
        <CardDescription />
      </CardHeader>

      <CardContent>
        <RadioGroup
          value={selectedFontSize}
          onValueChange={setSelectedFontSize}
        >
          {Object.entries(ORDER_FONT_SIZES).map(([value, { title, desc }]) => (
            <OrderRadioItem
              key={value}
              value={value}
              title={title}
              desc={desc}
            />
          ))}
        </RadioGroup>
      </CardContent>
      <CardFooter>
        <Button
          type="button"
          onClick={handleUpdateOrderFontSize}
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

const ORDER_FONT_SIZES = {
  14: {
    title: '14px',
    desc: '12px',
  },
  16: {
    title: '16px',
    desc: '14px',
  },
  18: {
    title: '18px',
    desc: '16px',
  },
} as const

export type OrderFontSize = keyof typeof ORDER_FONT_SIZES
