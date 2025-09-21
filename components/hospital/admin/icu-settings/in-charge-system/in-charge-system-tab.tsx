'use client'

import VetsUpdateFormDynamic from '@/components/hospital/icu/main/chart/selected-chart/chart-body/chart-infos/vets/vets-update-form-dynamic'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { updateIsInChargeSystem } from '@/lib/services/admin/icu/is-incharge-system'
import { cn } from '@/lib/utils/utils'
import { useBasicHosDataContext } from '@/providers/basic-hos-data-context-provider'
import { LoaderCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'

export default function InChargeSystemTab({ hosId }: { hosId: string }) {
  const {
    basicHosData: { isInChargeSystem, vetList },
  } = useBasicHosDataContext()

  const [currentIsInChageSystem, setCurrentIsInChageSystem] = useState(
    isInChargeSystem.toString(),
  )

  const { refresh } = useRouter()

  const [isUpdating, setIsUpdating] = useState(false)

  const handleUpdateShowOrderer = async () => {
    setIsUpdating(true)

    await updateIsInChargeSystem(hosId, currentIsInChageSystem === 'true')

    toast.success('담당자 시스템을 변경하였습니다')

    setIsUpdating(false)
    refresh()
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>담당자 시스템</CardTitle>
        <CardDescription>
          주치의 & 부주치의 시스템 또는 담당자 시스템을 선택할 수 있습니다
        </CardDescription>
      </CardHeader>

      <CardContent>
        <RadioGroup
          value={currentIsInChageSystem}
          onValueChange={setCurrentIsInChageSystem}
          className="flex justify-start gap-4"
        >
          {/* 주치의 & 부주치의 */}
          <RadioGroupItem value="false" id="false" className="hidden" />
          <Label
            htmlFor="false"
            className={cn(
              'relative block w-1/2 cursor-pointer rounded-md border p-4 shadow-md transition-opacity duration-700',
              currentIsInChageSystem === 'true'
                ? 'opacity-30'
                : 'opacity-100 ring-2 ring-primary',
            )}
          >
            <VetsUpdateFormDynamic
              icuChartId="1"
              inCharge={null}
              mainVet={vetList[0]}
              subVet={vetList[1] ?? null}
              vetsList={vetList}
              setIsDialogOpen={() => {}}
              isInChargeSystem={false}
              isSetting
            />
            <div className="absolute inset-0" />
          </Label>

          {/* 담당자 */}
          <RadioGroupItem value="true" id="true" className="hidden" />
          <Label
            htmlFor="true"
            className={cn(
              'relative block w-1/2 cursor-pointer rounded-md border p-4 shadow-md transition-opacity duration-700',
              currentIsInChageSystem === 'true'
                ? 'opacity-100 ring-2 ring-primary'
                : 'opacity-30',
            )}
          >
            <VetsUpdateFormDynamic
              icuChartId="1"
              inCharge={null}
              mainVet={vetList[0]}
              subVet={vetList[1] ?? null}
              vetsList={vetList}
              setIsDialogOpen={() => {}}
              isInChargeSystem={true}
              isSetting
            />
            <div className="absolute inset-0" />
          </Label>
        </RadioGroup>
      </CardContent>

      <CardFooter>
        <Button
          type="button"
          onClick={handleUpdateShowOrderer}
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
