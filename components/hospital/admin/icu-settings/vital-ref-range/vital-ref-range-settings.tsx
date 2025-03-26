import IcuSettingsCard from '@/components/hospital/admin/icu-settings/icu-settings-card'
import { toast } from '@/components/ui/use-toast'
import { updateVitalRefRange } from '@/lib/services/admin/icu/vital-ref-range'
import { type VitalRefRange } from '@/types/adimin'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import SingleVitalRefRange from './single-vital-ref-range'

type Props = {
  hosId: string
  vitalRefRangeData: VitalRefRange[]
}

export default function VitalRefRangeSettings({
  hosId,
  vitalRefRangeData,
}: Props) {
  const { refresh } = useRouter()

  const [isUpdating, setIsUpdating] = useState(false)
  const [localVitalRefRangeState, setLocalVitalRefRangeState] =
    useState(vitalRefRangeData)

  const handleUpdateVitalRefRange = async () => {
    setIsUpdating(true)

    await updateVitalRefRange(hosId, localVitalRefRangeState)

    toast({
      title: '바이탈 정상 범위가 수정되었습니다',
    })
    setIsUpdating(false)
    refresh()
  }

  const handleChange = (
    orderName: string,
    species: 'canine' | 'feline',
    type: 'min' | 'max',
    value: string,
  ) => {
    if (isNaN(Number(value))) return

    const roundedValue =
      value === '' ? '' : parseFloat(parseFloat(value).toFixed(2))

    setLocalVitalRefRangeState((prev) =>
      prev.map((vital) => {
        if (vital.order_name === orderName) {
          return {
            ...vital,
            [species]: {
              ...vital[species],
              [type]: roundedValue,
            },
          }
        }
        return vital
      }),
    )
  }

  return (
    <IcuSettingsCard
      title="바이탈 정상 범위 설정"
      description={
        <span className="flex items-center gap-1">
          입력 값이 정상 범위를 벗어나면
          <ChevronUp className="text-red-500" size={14} strokeWidth={4} />
          <ChevronDown className="text-blue-500" size={14} strokeWidth={4} />가
          표시됩니다
        </span>
      }
      onSubmit={handleUpdateVitalRefRange}
      isUpdating={isUpdating}
      cardWidth="w-full"
    >
      <div className="flex flex-col gap-6">
        {localVitalRefRangeState.map((vital) => (
          <SingleVitalRefRange
            vital={vital}
            key={vital.order_name}
            handleChange={handleChange}
          />
        ))}
      </div>
    </IcuSettingsCard>
  )
}
