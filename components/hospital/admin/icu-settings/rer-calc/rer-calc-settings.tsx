'use client'

import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { toast } from '@/components/ui/use-toast'
import { updateMaintenanceRateCalcMethod } from '@/lib/services/admin/icu/maintenance-rate'
import { updateRerCalcMethod } from '@/lib/services/admin/icu/rer-calc'
import { cn } from '@/lib/utils/utils'
import { LoaderCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function RerCalcSettings({
  hosId,
  rerCalcMethodData,
}: {
  hosId: string
  rerCalcMethodData: string
}) {
  const [localMaintenaceRateCalcMethod, setLocalMaintenaceRateCalcMethod] =
    useState(rerCalcMethodData)
  const [isUpdating, setIsUpdating] = useState(false)
  const { refresh } = useRouter()

  const handleUpdateMaintenanceRateCalcMethod = async () => {
    setIsUpdating(true)
    await updateRerCalcMethod(hosId, localMaintenaceRateCalcMethod)
    toast({
      title: '수정되었습니다',
    })
    setIsUpdating(false)
    refresh()
  }

  return (
    <>
      <RadioGroup
        value={localMaintenaceRateCalcMethod}
        onValueChange={setLocalMaintenaceRateCalcMethod}
        className="flex flex-col gap-10 p-4"
      >
        <div className="w-1/2">
          <RadioGroupItem value="a" id="a" className="hidden" />
          <Label
            htmlFor="a"
            className={cn(
              localMaintenaceRateCalcMethod === 'a' && 'ring ring-primary',
              'w block h-40 border p-5',
            )}
          >
            <div>
              a. 개 : (몸무게) * 30 + 70 kcal/day, 고양이 : (몸무게) * 40
              kcal/day
            </div>
          </Label>
        </div>

        <div className="w-1/2">
          <RadioGroupItem value="b" id="b" className="hidden" />
          <Label
            htmlFor="b"
            className={cn(
              localMaintenaceRateCalcMethod === 'b' && 'ring ring-primary',
              'block h-40 border p-5',
            )}
          >
            b. 개, 고양이 : 70 * (몸무게) <sup>0.75</sup> kcal/day
          </Label>
        </div>
      </RadioGroup>

      <Button
        onClick={handleUpdateMaintenanceRateCalcMethod}
        className="ml-auto"
        disabled={isUpdating}
      >
        저장
        <LoaderCircle
          className={cn(isUpdating ? 'ml-2 animate-spin' : 'hidden')}
        />
      </Button>
    </>
  )
}
