'use client'

import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { toast } from '@/components/ui/use-toast'
import { updateRerCalcMethod } from '@/lib/services/admin/icu/rer-calc'
import { cn } from '@/lib/utils/utils'
import { LoaderCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import IcuSettingsCard from '../icu-settings-card'

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
    <IcuSettingsCard
      title="RER 계산법"
      isUpdating={isUpdating}
      onSubmit={handleUpdateMaintenanceRateCalcMethod}
    >
      <RadioGroup
        value={localMaintenaceRateCalcMethod}
        onValueChange={setLocalMaintenaceRateCalcMethod}
        className="flex flex-col gap-10"
      >
        <div>
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

        <div>
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
    </IcuSettingsCard>
  )
}
