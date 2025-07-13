'use client'

import PatientFormDynamic from '@/components/common/patients/form/patient-form-dynamic'
import SearchPatientContainer from '@/components/common/patients/search/search-patient-containter'
import UpgragePlanPromptModal from '@/components/hospital/common/upgrade-plan-prompt-modal'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { canAddChart } from '@/constants/plans'
import { cn } from '@/lib/utils/utils'
import { useBasicHosDataContext } from '@/providers/basic-hos-data-context-provider'
import { useState } from 'react'
import RegisterDialogHeader from './register-dialog-header'
import RegisterIcuConfirmDialog from './register-icu-confirm-dialog'

export type RegisteringPatient = {
  patientId: string
  birth: string
  patientName: string
  ageInDays?: number
  species?: string
  breed?: string
  gender?: string
  microchipNo?: string
  memo?: string
  weight?: string
  ownerName?: string
  ownerId?: string
  hosPatientId?: string
} | null

type Props = {
  hosId: string
  defaultVetId: string
  defaultGroup: string
  currentChartNumber: number
}

export default function RegisterDialog({
  hosId,
  defaultGroup,
  defaultVetId,
  currentChartNumber,
}: Props) {
  const {
    basicHosData: { plan },
  } = useBasicHosDataContext()

  const [tab, setTab] = useState('search')
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false)
  const [registeringPatient, setRegisteringPatient] =
    useState<RegisteringPatient>(null)
  const [isRegisterDialogOpen, setIsRegisterDialogOpen] = useState(false)

  const isAvailableAddChart = canAddChart(plan, currentChartNumber)

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
      setRegisteringPatient(null)
    }
    setIsRegisterDialogOpen(open)
  }

  return (
    <Dialog open={isRegisterDialogOpen} onOpenChange={handleOpenChage}>
      <DialogTrigger asChild className="hidden md:flex">
        <Button size="sm" className="shrink-0 text-sm">
          환자 입원
        </Button>
      </DialogTrigger>

      <DialogContent
        className={cn('flex h-[704px] flex-col sm:max-w-[1200px]')}
        onInteractOutside={(e) => {
          e.preventDefault()
        }}
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
            <SearchPatientContainer
              hosId={hosId}
              isIcu
              setIsConfirmDialogOpen={setIsConfirmDialogOpen}
              setRegisteringPatient={setRegisteringPatient}
            />
          </TabsContent>

          <TabsContent value="register">
            <PatientFormDynamic
              mode="registerFromIcuRoute"
              hosId={hosId}
              setIsPatientRegisterDialogOpen={setIsRegisterDialogOpen}
              setIsConfirmDialogOpen={setIsConfirmDialogOpen}
              registeringPatient={registeringPatient}
              setRegisteringPatient={setRegisteringPatient}
              debouncedSearch={null}
            />
          </TabsContent>
        </Tabs>

        {isConfirmDialogOpen && !isAvailableAddChart && (
          <UpgragePlanPromptModal
            title="차트 생성 실패"
            onExit={() => setIsConfirmDialogOpen(false)}
          />
        )}
      </DialogContent>

      {isConfirmDialogOpen && isAvailableAddChart && (
        <RegisterIcuConfirmDialog
          isConfirmDialogOpen={isConfirmDialogOpen}
          setIsConfirmDialogOpen={setIsConfirmDialogOpen}
          hosId={hosId}
          defaultVetId={defaultVetId}
          defaultGroup={defaultGroup}
          registeringPatient={registeringPatient}
          setIsRegisterDialogOpen={setIsRegisterDialogOpen}
          currentChartNumber={currentChartNumber}
        />
      )}
    </Dialog>
  )
}
