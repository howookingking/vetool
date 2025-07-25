'use client'
import LargeLoaderCircle from '@/components/common/large-loader-circle'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/lib/utils/utils'
import dynamic from 'next/dynamic'
import RegisterDialogHeader from '@/components/hospital/icu/sidebar/register-dialog/register-dialog-header'
import { ChecklistData } from '@/types/checklist/checklist-type'

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
  checklistData: ChecklistData | null
}
const LazyRegisterChecklistConfirmDialog = dynamic(
  () =>
    import(
      '@/components/hospital/checklist/sidebar/checklist-register-dialog/register-checklist-confirm-dialog'
    ),
  {
    ssr: false,
  },
)
const LazyPatientForm = dynamic(
  () => import('@/components/common/patients/form/patient-form'),
  {
    ssr: false,
    loading: () => <LargeLoaderCircle className="h-[544px]" />,
  },
)
const LazySearchPatientContainer = dynamic(
  () =>
    import(
      '@/components/common/patients/search/non-icu/non-icu-search-patient-container'
    ),
  {
    ssr: false,
    loading: () => <LargeLoaderCircle className="h-[574px]" />,
  },
)
export default function ChecklistRegisterDialog({
  hosId,
  checklistData,
}: Props) {
  const [tab, setTab] = useState('search')
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false)
  const [registeringPatient, setRegisteringPatient] =
    useState<RegisteringPatient>(null)
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
      setRegisteringPatient(null)
    }
    setIsRegisterDialogOpen(open)
  }
  const fastRegist = () => {
    setIsConfirmDialogOpen(true)
    setRegisteringPatient(null)
  }
  return (
    <Dialog open={isRegisterDialogOpen} onOpenChange={handleOpenChage}>
      <DialogTrigger asChild className="hidden md:flex">
        <Button size="sm" className="shrink-0 text-sm">
          {checklistData ? '환자 등록' : '체크리스트 추가'}
        </Button>
      </DialogTrigger>

      <DialogContent
        className={cn('flex h-[704px] flex-col sm:max-w-[1200px]')}
        onInteractOutside={(e) => {
          e.preventDefault()
        }}
      >
        {!checklistData && (
          <div className="flex justify-start">
            <Button
              size="sm"
              className="text-sm"
              variant="destructive"
              onClick={fastRegist}
            >
              응급 환자 바로 등록
            </Button>
          </div>
        )}
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
            <LazySearchPatientContainer
              hosId={hosId}
              isIcu={true}
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
              debouncedSearch={null}
            />
          </TabsContent>
        </Tabs>
      </DialogContent>
      {isConfirmDialogOpen && (
        <LazyRegisterChecklistConfirmDialog
          hosId={hosId}
          isConfirmDialogOpen={isConfirmDialogOpen}
          setIsConfirmDialogOpen={setIsConfirmDialogOpen}
          registeringPatient={registeringPatient}
          setIsRegisterDialogOpen={setIsRegisterDialogOpen}
          checklistData={checklistData ? checklistData : null}
        />
      )}
    </Dialog>
  )
}
