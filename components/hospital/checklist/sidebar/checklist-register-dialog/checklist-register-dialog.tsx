'use client'

import PatientForm from '@/components/common/patients/form/patient-form'
import NonIcuSearchPatientContainer from '@/components/common/patients/search/non-icu/non-icu-search-patient-container'
import RegisterChecklistConfirmDialog from '@/components/hospital/checklist/sidebar/checklist-register-dialog/register-checklist-confirm-dialog'
import RegisterDialogHeader from '@/components/hospital/icu/sidebar/register-dialog/register-dialog-header'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/lib/utils/utils'
import { PlusIcon } from 'lucide-react'
import { useState } from 'react'

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

export default function ChecklistRegisterDialog({ hosId }: { hosId: string }) {
  const [tab, setTab] = useState('search')
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false)
  const [registeringPatient, setRegisteringPatient] =
    useState<RegisteringPatient>(null)
  const [isRegisterDialogOpen, setIsRegisterDialogOpen] = useState(false)
  const [isEmergency, setIsEmergency] = useState(false)

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
      <DialogTrigger asChild>
        <Button size="sm" className="w-1/2 text-sm">
          <PlusIcon />
          체크리스트 등록
        </Button>
      </DialogTrigger>

      <DialogContent
        className={cn('flex flex-col sm:max-w-[1200px]')}
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
            <NonIcuSearchPatientContainer
              hosId={hosId}
              isIcu={true}
              setIsConfirmDialogOpen={setIsConfirmDialogOpen}
              setRegisteringPatient={setRegisteringPatient}
            />
          </TabsContent>

          <TabsContent value="register">
            <PatientForm
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
        <RegisterChecklistConfirmDialog
          hosId={hosId}
          isConfirmDialogOpen={isConfirmDialogOpen}
          setIsConfirmDialogOpen={setIsConfirmDialogOpen}
          registeringPatient={registeringPatient}
          setIsRegisterDialogOpen={setIsRegisterDialogOpen}
          isEmergency={isEmergency}
          setIsEmergency={setIsEmergency}
        />
      )}
    </Dialog>
  )
}
