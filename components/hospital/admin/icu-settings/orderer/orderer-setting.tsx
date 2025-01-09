'use client'

import IcuSettingsCard from '@/components/hospital/admin/icu-settings/icu-settings-card'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { toast } from '@/components/ui/use-toast'
import { updateOrdererSetting } from '@/lib/services/admin/icu/orderer'
import { cn } from '@/lib/utils/utils'
import { useState } from 'react'

export default function OrdererSetting({
  hosId,
  showOrderer,
  showTxUser,
}: {
  hosId: string
  showOrderer: boolean
  showTxUser: boolean
}) {
  const [showOrdererInput, setShowOrdererInput] = useState(showOrderer)
  const [showTxUserInput, setShowTxUserInput] = useState(showTxUser)

  const handleUpdateShowOrderer = async () => {
    await updateOrdererSetting(hosId, showOrdererInput, showTxUserInput)

    toast({
      title: '오더자 & 처치자 설정',
      description: '오더자 & 처치자 설정을 변경하였습니다',
    })
  }

  return (
    <IcuSettingsCard
      title="오더자 입력 & 처치자 설정"
      description="OFF시 오더자 입력 또는 처치자 입력 단계를 생략합니다"
      onSubmit={handleUpdateShowOrderer}
    >
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Switch
            id="orderer"
            checked={showOrdererInput}
            onCheckedChange={setShowOrdererInput}
          />
          <Label htmlFor="orderer">
            오더자 입력 단계
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

        <div className="flex items-center space-x-2">
          <Switch
            id="txUser"
            checked={showTxUserInput}
            onCheckedChange={setShowTxUserInput}
          />
          <Label htmlFor="txUser">
            처치자 입력 단계
            <span
              className={cn(
                showTxUserInput ? 'text-green-600' : 'text-red-600',
                'ml-2',
              )}
            >
              {showTxUserInput ? 'ON' : 'OFF'}
            </span>
          </Label>
        </div>
      </div>
    </IcuSettingsCard>
  )
}
