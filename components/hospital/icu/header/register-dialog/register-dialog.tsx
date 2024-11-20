'use client'

import RegisterDialogHeader from '@/components/hospital/icu/header/register-dialog/register-dialog-header'
import RegisterIcuForm from '@/components/hospital/icu/header/register-dialog/register-icu/register-icu-form'
import SearchPatientContainer from '@/components/hospital/icu/header/register-dialog/search-patient/search-patient-containter'
import PatientForm from '@/components/hospital/patients/patient-form'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useIcuRegisterStore } from '@/lib/store/icu/icu-register'
import { cn } from '@/lib/utils/utils'
import type { Vet } from '@/types/icu/chart'
import { useCallback, useState } from 'react'

export default function RegisterDialog({
  hosId,
  groupList,
  vetsData,
  totalPatientCount,
}: {
  hosId: string
  groupList: string[]
  vetsData: Vet[]
  totalPatientCount: number
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
              <SearchPatientContainer
                totalPatientCount={totalPatientCount}
                itemsPerPage={8}
                isIcu
              />
            )}
            {step === 'icuRegister' && (
              <RegisterIcuForm
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
              <PatientForm
                mode="registerFromIcuRoute"
                setStep={setStep}
                hosId={hosId}
                setIsPatientRegisterDialogOpen={setIsRegisterDialogOpen}
              />
            )}
            {step === 'icuRegister' && (
              <RegisterIcuForm
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
