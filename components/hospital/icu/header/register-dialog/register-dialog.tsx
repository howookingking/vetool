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
import { useParams } from 'next/navigation'
import { useState } from 'react'

const LazyRegisterIcuConfirmDialog = dynamic(
  () =>
    import(
      '@/components/hospital/icu/header/register-dialog/register-icu-confirm-dialog'
    ),
  {
    ssr: false,
    loading: () => <LargeLoaderCircle className="h-[356px]" />,
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
      '@/components/hospital/icu/header/register-dialog/search-patient/search-patient-containter'
    ),
  {
    ssr: false,
    loading: () => <LargeLoaderCircle className="h-[574px]" />,
  },
)

export default function RegisterDialog({
  hosId,
  hosGroupList,
  vetsListData,
}: {
  hosId: string
  hosGroupList: string[]
  vetsListData: Vet[]
}) {
  const [isRegisterDialogOpen, setIsRegisterDialogOpen] = useState(false)
  const [tab, setTab] = useState('search')

  const { target_date } = useParams()
  const { reset, isConfirmDialogOpen, setIsConfirmDialogOpen } =
    useIcuRegisterStore()

  const defaultGroup = hosGroupList[0]
  const defaultVetId = vetsListData[0].user_id

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

  const handleCloseDialog = () => {
    setIsRegisterDialogOpen(false)
    setIsConfirmDialogOpen(false)
    setTab('search')
    reset()
  }

  return (
    <Dialog open={isRegisterDialogOpen} onOpenChange={setIsRegisterDialogOpen}>
      <DialogTrigger asChild className="hidden md:flex">
        <Button>환자 입원</Button>
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
            <LazySearchPatientContainer itemsPerPage={8} hosId={hosId} isIcu />
          </TabsContent>

          <TabsContent value="register">
            <LazyPatientForm
              mode="registerFromIcuRoute"
              hosId={hosId}
              setIsPatientRegisterDialogOpen={setIsRegisterDialogOpen}
              setIsConfirmDialogOpen={setIsConfirmDialogOpen}
            />
          </TabsContent>
        </Tabs>
      </DialogContent>

      <LazyRegisterIcuConfirmDialog
        handleCloseDialog={handleCloseDialog}
        isConfirmDialogOpen={isConfirmDialogOpen}
        setIsConfirmDialogOpen={setIsConfirmDialogOpen}
        hosId={hosId}
        defaultMainVetId={defaultVetId}
        defaultMainGroup={defaultGroup}
      />
    </Dialog>
  )
}
