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
import { Switch } from '@/components/ui/switch'
import { toast } from '@/components/ui/use-toast'
import { updateOrdererSetting } from '@/lib/services/admin/icu/orderer'
import { cn } from '@/lib/utils/utils'
import { LoaderCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import OrdererSelecteStepSample from './orderer-select-step-sample'
import TxSelectUserStepSample from './tx-select-user-step-sample'

type Props = {
  hosId: string
  showOrderer: boolean
  showTxUser: boolean
  showTxUserInput?: boolean
}

export default function OrdererSetting({
  hosId,
  showOrderer,
  showTxUser,
}: Props) {
  const { refresh } = useRouter()

  const [isUpdating, setIsUpdating] = useState(false)
  const [showOrdererInput, setShowOrdererInput] = useState(showOrderer)
  const [showTxUserInput, setShowTxUserInput] = useState(showTxUser)

  const handleUpdateShowOrderer = async () => {
    setIsUpdating(true)

    await updateOrdererSetting(hosId, showOrdererInput, showTxUserInput)

    toast({
      title: '오더자 & 처치자 설정을 변경하였습니다',
    })

    setIsUpdating(false)
    refresh()
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>오더자 & 처치자</CardTitle>
        <CardDescription>
          OFF시 오더자 입력 또는 처치자 입력 단계를 생략합니다
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="mb-2 grid grid-cols-2 gap-4">
          <div className="flex items-center space-x-2">
            <Switch
              id="orderer"
              checked={showOrdererInput}
              onCheckedChange={setShowOrdererInput}
            />
            <Label htmlFor="orderer" className="cursor-pointer">
              오더자 입력 단계
            </Label>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="txUser"
              checked={showTxUserInput}
              onCheckedChange={setShowTxUserInput}
            />
            <Label htmlFor="txUser" className="cursor-pointer">
              처치자 입력 단계
            </Label>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <OrdererSelecteStepSample showOrdererInput={showOrdererInput} />

          <TxSelectUserStepSample showTxUserInput={showTxUserInput} />
        </div>
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
