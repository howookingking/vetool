'use client'

import LargeLoaderCircle from '@/components/common/large-loader-circle'
import RegisterDialogHeader from '@/components/hospital/icu/header/register-dialog/register-dialog-header'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useIcuRegisterStore } from '@/lib/store/icu/icu-register'
import { cn } from '@/lib/utils/utils'
import type { Vet } from '@/types/icu/chart'
import dynamic from 'next/dynamic'
import { useCallback, useState } from 'react'

const LazyRegisterIcuForm = dynamic(
  () =>
    import(
      '@/components/hospital/icu/header/register-dialog/register-icu/register-icu-form'
    ),
  {
    ssr: false,
    loading: () => <LargeLoaderCircle className="h-[574px]" />,
  },
)
const LazyPatientForm = dynamic(
  () => import('@/components/hospital/patients/patient-form'),
  {
    ssr: false,
    loading: () => <LargeLoaderCircle className="h-[574px]" />,
  },
)
const LazySearchPatientContainer = dynamic(
  () =>
    import(
      '@/components/hospital/icu/header/register-dialog/search-patient/search-patient-containter'
    ),
  {
    ssr: false,
    loading: () => <LargeLoaderCircle className="h-[574px]" />,
  },
)

export default function RegisterDialog({
  hosId,
  groupList,
  vetsData,
}: {
  hosId: string
  groupList: string[]
  vetsData: Vet[]
}) {
  const [isRegisterDialogOpen, setIsRegisterDialogOpen] = useState(false)
  const { step, setStep, reset } = useIcuRegisterStore()
  const [tab, setTab] = useState('search')

  const handleTabValueChange = useCallback(
    (value: string) => {
      if (value === 'search') {
        setTab('search')
        setStep('patientSearch')
        return
      }

      if (value === 'register') {
        setTab('register')
        setStep('patientRegister')
        return
      }
    },
    [setTab, setStep],
  )

  const handleCloseDialog = useCallback(() => {
    setIsRegisterDialogOpen(false)
    setTab('search')
    reset()
  }, [setIsRegisterDialogOpen, reset])

  return (
    <Dialog open={isRegisterDialogOpen} onOpenChange={setIsRegisterDialogOpen}>
      <DialogTrigger asChild className="hidden md:block">
        <Button size="sm">환자 입원</Button>
      </DialogTrigger>

      <DialogContent
        className="flex min-h-[720px] flex-col sm:max-w-[1200px]"
        onInteractOutside={(e) => {
          e.preventDefault()
        }}
      >
        <RegisterDialogHeader step={step} />

        <Tabs
          defaultValue="search"
          onValueChange={handleTabValueChange}
          value={tab}
        >
          <TabsList
            className={cn('mb-2 w-full', step === 'icuRegister' && 'hidden')}
          >
            <TabsTrigger value="search" className="w-full">
              환자 조회
            </TabsTrigger>
            <TabsTrigger value="register" className="w-full">
              신규 환자 등록
            </TabsTrigger>
          </TabsList>

          <TabsContent value="search">
            {step === 'patientSearch' && (
              <LazySearchPatientContainer
                itemsPerPage={8}
                isIcu
                hosId={hosId}
              />
            )}
            {step === 'icuRegister' && (
              <LazyRegisterIcuForm
                handleCloseDialog={handleCloseDialog}
                hosId={hosId}
                groupList={groupList}
                vetsData={vetsData}
                tab={tab}
              />
            )}
          </TabsContent>

          <TabsContent value="register">
            {step === 'patientRegister' && (
              <LazyPatientForm
                mode="registerFromIcuRoute"
                setStep={setStep}
                hosId={hosId}
                setIsPatientRegisterDialogOpen={setIsRegisterDialogOpen}
              />
            )}
            {step === 'icuRegister' && (
              <LazyRegisterIcuForm
                handleCloseDialog={handleCloseDialog}
                hosId={hosId}
                groupList={groupList}
                vetsData={vetsData}
                tab={tab}
              />
            )}
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
