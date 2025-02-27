import IcuSettingsCard from '@/components/hospital/admin/icu-settings/icu-settings-card'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { toast } from '@/components/ui/use-toast'
import { updateMaintenanceRateCalcMethod } from '@/lib/services/admin/icu/maintenance-rate'
import { cn } from '@/lib/utils/utils'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function MaintenanceRateSettings({
  hosId,
  maintenaceRateCalcMethodData,
}: {
  hosId: string
  maintenaceRateCalcMethodData: string
}) {
  const [isUpdating, setIsUpdating] = useState(false)
  const [localMaintenaceRateCalcMethod, setLocalMaintenaceRateCalcMethod] =
    useState(maintenaceRateCalcMethodData)

  const { refresh } = useRouter()

  const handleUpdateMaintenanceRateCalcMethod = async () => {
    setIsUpdating(true)
    await updateMaintenanceRateCalcMethod(hosId, localMaintenaceRateCalcMethod)
    toast({
      title: '수정되었습니다',
    })
    setIsUpdating(false)
    refresh()
  }

  return (
    <IcuSettingsCard
      title="유지속도 계산법"
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
            a. 개 : 60ml/kg/day, 고양이 : 40ml/kg/day
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
            b. 개 : 132 * (몸무게) <sup>0.75</sup> ml/day, 고양이 :80 * (몸무게){' '}
            <sup>0.75</sup> ml/day
          </Label>
        </div>

        <div>
          <RadioGroupItem value="c" id="c" className="hidden" />
          <Label
            htmlFor="c"
            className={cn(
              localMaintenaceRateCalcMethod === 'c' && 'ring ring-primary',
              'block h-40 border p-5',
            )}
          >
            c. 개 : 30 * (몸무게) + 70 ml/day, 고양이 : 30 * (몸무게) + 70
            ml/day
          </Label>
        </div>
      </RadioGroup>
    </IcuSettingsCard>
  )
}
