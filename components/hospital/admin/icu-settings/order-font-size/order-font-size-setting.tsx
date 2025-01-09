import IcuSettingsCard from '@/components/hospital/admin/icu-settings/icu-settings-card'
import OrderRadioItem from '@/components/hospital/admin/icu-settings/order-font-size/order-radio-item'
import { RadioGroup } from '@/components/ui/radio-group'
import { toast } from '@/components/ui/use-toast'
import { ORDER_FONT_SIZES } from '@/constants/admin/admin-setting-items'
import { updateOrderFontSize } from '@/lib/services/admin/icu/order-font-size'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function OrderFontSetting({
  hosId,
  orderFontSize,
}: {
  hosId: string
  orderFontSize: number
}) {
  const { refresh } = useRouter()

  const [isUpdating, setIsUpdating] = useState(false)
  const [selectedFontSize, setSelectedFontSize] = useState(
    orderFontSize.toString(),
  )

  const handleUpdateOrderFontSize = async () => {
    setIsUpdating(true)

    await updateOrderFontSize(hosId, selectedFontSize)

    toast({
      title: '오더의 글자 크기를 변경하였습니다.',
    })

    setIsUpdating(false)
    refresh()
  }

  return (
    <IcuSettingsCard
      title="오더 글자 크기"
      isUpdating={isUpdating}
      onSubmit={handleUpdateOrderFontSize}
    >
      <RadioGroup value={selectedFontSize} onValueChange={setSelectedFontSize}>
        {Object.entries(ORDER_FONT_SIZES).map(([value, { title, desc }]) => (
          <OrderRadioItem key={value} value={value} title={title} desc={desc} />
        ))}
      </RadioGroup>
    </IcuSettingsCard>
  )
}
