'use client'

import { Switch } from '@/components/ui/switch'
import { toast } from '@/components/ui/use-toast'
import { updateShowOrderer } from '@/lib/services/admin/icu/orderer'
import { Dispatch, SetStateAction, useState } from 'react'
import IcuSettingsCard from '../icu-settings-card'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils/utils'

export default function OrdererSetting({
  hosId,
  showOrderer,
}: {
  hosId: string
  showOrderer: boolean
}) {
  const [showOrdererInput, setShowOrdererInput] = useState(showOrderer)

  const handleUpdateShowOrderer = async () => {
    await updateShowOrderer(hosId, showOrdererInput)

    toast({
      title: '오더자 설정',
      description: '오더자 설정을 변경하였습니다',
    })
  }

  return (
    <IcuSettingsCard
      title="오더자 표시"
      description="어떤 수의사가 오더를 내렸는지 표시합니다"
      onSubmit={handleUpdateShowOrderer}
    >
      <div className="flex items-center space-x-2">
        <Switch
          id="orderer"
          checked={showOrdererInput}
          onCheckedChange={setShowOrdererInput}
        />
        <Label htmlFor="orderer">
          오더자 표시
          <span
            className={cn(
              showOrdererInput ? 'text-green-600' : 'text-red-600',
              'ml-2',
            )}
          >
            {showOrdererInput ? 'ON' : 'OFF'}
          </span>
        </Label>
      </div>
    </IcuSettingsCard>
  )
}
