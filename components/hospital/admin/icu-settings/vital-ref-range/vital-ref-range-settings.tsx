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
import { updateVitalRefRange } from '@/lib/services/admin/icu/vital-ref-range'
import { cn } from '@/lib/utils/utils'
import { type VitalRefRange } from '@/types/adimin'
import { ChevronDown, ChevronUp, LoaderCircle } from 'lucide-react'
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

  const handleUpdateVitalRefRange = async (event: React.FormEvent) => {
    event.preventDefault()
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
    <form onSubmit={handleUpdateVitalRefRange}>
      <Card>
        <CardHeader>
          <CardTitle>바이탈 정상 범위 설정</CardTitle>
          <CardDescription>
            <span className="flex items-center gap-1">
              입력 값이 정상 범위를 벗어나면
              <ChevronUp className="text-red-500" size={14} strokeWidth={4} />
              <ChevronDown
                className="text-blue-500"
                size={14}
                strokeWidth={4}
              />
              가 표시됩니다
            </span>
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="flex flex-col gap-6">
            {localVitalRefRangeState.map((vital) => (
              <SingleVitalRefRange
                vital={vital}
                key={vital.order_name}
                handleChange={handleChange}
              />
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <Button
            type="submit"
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
    </form>
  )
}
