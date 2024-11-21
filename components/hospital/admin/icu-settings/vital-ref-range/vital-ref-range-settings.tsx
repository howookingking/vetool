'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from '@/components/ui/use-toast'
import { updateVitalRefRange } from '@/lib/services/admin/icu/vital-ref-range'
import { cn } from '@/lib/utils/utils'
import type { VitalRefRange } from '@/types/adimin'
import { LoaderCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function VitalRefRangeSettings({
  hosId,
  vitalRefRangeData,
}: {
  hosId: string
  vitalRefRangeData: VitalRefRange[]
}) {
  const [isUpdating, setIsUpdating] = useState(false)
  const [localVitalRefRangeState, setLocalVitalRefRangeState] =
    useState(vitalRefRangeData)

  const { refresh } = useRouter()

  const handleUpdateVitalRefRange = async () => {
    setIsUpdating(true)

    await updateVitalRefRange(hosId, localVitalRefRangeState)

    toast({
      title: '수정되었습니다',
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
    setLocalVitalRefRangeState((prev) =>
      prev.map((vital) => {
        if (vital.order_name === orderName) {
          return {
            ...vital,
            [species]: {
              ...vital[species],
              [type]: parseFloat(value) || 0,
            },
          }
        }
        return vital
      }),
    )
  }

  return (
    <form className="flex flex-col gap-4">
      {localVitalRefRangeState.map((vital) => (
        <div key={vital.order_name}>
          <h4 className="mb-1 text-base font-bold">{vital.order_name}</h4>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-4 rounded-md bg-slate-50 p-4">
              <div className="font-medium">Canine</div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor={`${vital.order_name}-canine-min`}>최소</Label>
                  <Input
                    className="bg-white"
                    id={`${vital.order_name}-canine-min`}
                    type="number"
                    step="0.1"
                    value={vital.canine.min}
                    onChange={(e) =>
                      handleChange(
                        vital.order_name,
                        'canine',
                        'min',
                        e.target.value,
                      )
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`${vital.order_name}-canine-max`}>최대</Label>
                  <Input
                    className="bg-white"
                    id={`${vital.order_name}-canine-max`}
                    type="number"
                    step="0.1"
                    value={vital.canine.max}
                    onChange={(e) =>
                      handleChange(
                        vital.order_name,
                        'canine',
                        'max',
                        e.target.value,
                      )
                    }
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4 rounded-md bg-slate-50 p-4">
              <div className="font-medium">Feline</div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor={`${vital.order_name}-feline-min`}>최소</Label>
                  <Input
                    className="bg-white"
                    id={`${vital.order_name}-feline-min`}
                    type="number"
                    step="0.1"
                    value={vital.feline.min}
                    onChange={(e) =>
                      handleChange(
                        vital.order_name,
                        'feline',
                        'min',
                        e.target.value,
                      )
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`${vital.order_name}-feline-max`}>최대</Label>
                  <Input
                    className="bg-white"
                    id={`${vital.order_name}-feline-max`}
                    type="number"
                    step="0.1"
                    value={vital.feline.max}
                    onChange={(e) =>
                      handleChange(
                        vital.order_name,
                        'feline',
                        'max',
                        e.target.value,
                      )
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      <Button
        disabled={isUpdating}
        onClick={handleUpdateVitalRefRange}
        className="mr-auto"
      >
        저장
        <LoaderCircle
          className={cn(isUpdating ? 'ml-2 animate-spin' : 'hidden')}
        />
      </Button>
    </form>
  )
}
