'use client'

import ClSearchPatientContainer from '@/components/hospital/checklist/sidebar/checklist-register-dialog/cl-search-patient-container'
import RegisterDialogHeader from '@/components/hospital/icu/sidebar/register-dialog/register-dialog-header'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/lib/utils/utils'
import { PlusIcon } from 'lucide-react'
import { useState } from 'react'
import ClPatientRegisterForm from './cl-patient-register-form'

type Props = {
  hosId: string
  targetDate: string
  isEmergency?: boolean
}

export default function ClRegisterDialog({
  hosId,
  targetDate,
  isEmergency,
}: Props) {
  const [tab, setTab] = useState('search')
  const [isRegisterDialogOpen, setIsRegisterDialogOpen] = useState(false)

  const handleTabValueChange = (value: string) => {
    if (value === 'search') {
      setTab('search')
      return
    }

    if (value === 'register') {
      setTab('register')
      return
    }
  }

  const handleOpenChage = (open: boolean) => {
    if (open) {
      setTab('search')
    }
    setIsRegisterDialogOpen(open)
  }

  return (
    <Dialog open={isRegisterDialogOpen} onOpenChange={handleOpenChage}>
      <DialogTrigger asChild>
        <Button
          size="sm"
          className={cn(isEmergency ? 'w-32' : 'w-1/2', 'text-sm')}
        >
          <PlusIcon />
          {isEmergency ? '환자 등록' : '체크리스트 등록'}
        </Button>
      </DialogTrigger>

      <DialogContent
        className={cn('flex flex-col sm:max-w-[1200px]')}
        onInteractOutside={(e) => e.preventDefault()}
      >
        <RegisterDialogHeader tab={tab} />
        <Tabs
          defaultValue="search"
          onValueChange={handleTabValueChange}
          value={tab}
        >
          <TabsList className="mb-2 w-full">
            <TabsTrigger value="search" className="w-full">
              환자 검색 및 선택
            </TabsTrigger>

            <TabsTrigger value="register" className="w-full">
              신규 환자 등록
            </TabsTrigger>
          </TabsList>

          <TabsContent value="search">
            <ClSearchPatientContainer
              hosId={hosId}
              targetDate={targetDate}
              setIsRegisterDialogOpen={setIsRegisterDialogOpen}
            />
          </TabsContent>

          <TabsContent value="register">
            <ClPatientRegisterForm
              hosId={hosId}
              targetDate={targetDate}
              setIsPatientRegisterDialogOpen={setIsRegisterDialogOpen}
            />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
