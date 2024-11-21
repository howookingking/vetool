'use client'

import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { toast } from '@/components/ui/use-toast'
import { updateShowOrderer } from '@/lib/services/admin/icu/orderer'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

export default function OrdererSwitch({
  showOrderer,
  hosId,
}: {
  showOrderer: boolean
  hosId: string
}) {
  const [showOrdererInput, setShowOrdererInput] = useState(showOrderer)
  const { refresh } = useRouter()

  const handleUpdateShowOrderer = async () => {
    await updateShowOrderer(hosId, showOrdererInput)

    toast({
      title: '오더자 설정',
      description: '오더자 설정을 변경하였습니다',
    })
    refresh()
  }

  return (
    <div className="flex items-center space-x-2">
      <Switch
        id="orderer"
        checked={showOrdererInput}
        onCheckedChange={setShowOrdererInput}
      />
      <Label htmlFor="orderer">오더자 설정</Label>

      <Button onClick={handleUpdateShowOrderer}>저장</Button>
    </div>
  )
}
