'use client'

import LargeLoaderCircle from '@/components/common/large-loader-circle'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/lib/utils/utils'
import dynamic from 'next/dynamic'
import { useParams } from 'next/navigation'
import { useState } from 'react'
import RegisterDialogHeader from './register-dialog-header'
import { useBasicHosDataContext } from '@/providers/basic-hos-data-context-provider'
import { canAddChart } from '@/constants/plans'
import UpgragePlanPromptModal from '@/components/hospital/common/upgrade-plan-prompt-modal'

const LazyRegisterIcuConfirmDialog = dynamic(
  () =>
    import(
      '@/components/hospital/icu/sidebar/register-dialog/register-icu-confirm-dialog'
    ),
  {
    ssr: false,
  },
)
const LazyPatientForm = dynamic(
  () => import('@/components/hospital/patients/patient-form'),
  {
    ssr: false,
    loading: () => <LargeLoaderCircle className="h-[544px]" />,
  },
)
const LazySearchPatientContainer = dynamic(
  () =>
    import(
      '@/components/hospital/icu/sidebar/register-dialog/search-patient/search-patient-containter'
    ),
  {
    ssr: false,
    loading: () => <LargeLoaderCircle className="h-[574px]" />,
  },
)

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
  const { target_date } = useParams()

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
        className={cn('flex flex-col sm:max-w-[1200px]')}
        onInteractOutside={(e) => {
          e.preventDefault()
        }}
      >
        <RegisterDialogHeader tab={tab} targetDate={target_date as string} />

        <Tabs
          defaultValue="search"
          onValueChange={handleTabValueChange}
          value={tab}
        >
          <TabsList className="mb-2 w-full">
            <TabsTrigger value="search" className="w-full">
              환자 조회
            </TabsTrigger>
            <TabsTrigger value="register" className="w-full">
              신규 환자 등록
            </TabsTrigger>
          </TabsList>

          <TabsContent value="search">
            <LazySearchPatientContainer
              itemsPerPage={8}
              hosId={hosId}
              isIcu
              setIsConfirmDialogOpen={setIsConfirmDialogOpen}
              setRegisteringPatient={setRegisteringPatient}
            />
          </TabsContent>

          <TabsContent value="register">
            <LazyPatientForm
              mode="registerFromIcuRoute"
              hosId={hosId}
              setIsPatientRegisterDialogOpen={setIsRegisterDialogOpen}
              setIsConfirmDialogOpen={setIsConfirmDialogOpen}
              registeringPatient={registeringPatient}
              setRegisteringPatient={setRegisteringPatient}
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
        <LazyRegisterIcuConfirmDialog
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
