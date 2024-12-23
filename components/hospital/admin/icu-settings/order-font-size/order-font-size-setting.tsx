'use client'

import IcuSettingsCard from '@/components/hospital/admin/icu-settings/icu-settings-card'
import { RadioGroup } from '@/components/ui/radio-group'
import { toast } from '@/components/ui/use-toast'
import { useState } from 'react'
import OrderRadioItem from './order-radio-item'
import { updateOrderFontSize } from '@/lib/services/admin/icu/order-font-size'

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
}

export default function OrderFontSetting({
  hosId,
  orderFontSize,
}: {
  hosId: string
  orderFontSize: number
}) {
  const [selectedFontSize, setSelectedFontSize] = useState(
    orderFontSize.toString(),
  )
  const [isUpdating, setIsUpdating] = useState(false)

  const handleUpdateOrderFontSize = async () => {
    setIsUpdating(true)

    await updateOrderFontSize(hosId, selectedFontSize)

    toast({
      title: '오더의 글자 크기를 변경하였습니다.',
    })

    setIsUpdating(false)
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
