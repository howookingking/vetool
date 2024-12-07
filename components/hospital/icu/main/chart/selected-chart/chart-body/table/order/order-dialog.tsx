'use client'

import LargeLoaderCircle from '@/components/common/large-loader-circle'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import type { Patient, SelectedIcuOrder } from '@/types/icu/chart'
import { Plus } from 'lucide-react'
import dynamic from 'next/dynamic'
import { Dispatch, SetStateAction } from 'react'
import OrdererSelectStep from './orderer/orderer-select-step'
import { useIcuOrderStore } from '@/lib/store/icu/icu-order'

const LazyOrderForm = dynamic(() => import('./order-form'), {
  ssr: false,
  loading: () => <LargeLoaderCircle className="h-[388px]" />,
})
const LazyTemplateTabContent = dynamic(
  () => import('./template/template-tab-content'),
  {
    ssr: false,
    loading: () => <LargeLoaderCircle className="h-[388px]" />,
  },
)

export default function OrderDialog({
  hosId,
  icuChartId,
  orders,
  showOrderer,
  patient,
  weight,
  ageInDays,
  orderStep,
  isExport,
  setSortedOrders,
  mainVetName,
  derCalcFactor,
  onOpenChange,
  isEditTemplateMode,
}: {
  hosId: string
  icuChartId?: string
  orders?: SelectedIcuOrder[]
  showOrderer?: boolean
  patient?: Patient
  weight?: string
  ageInDays?: number
  orderStep: 'closed' | 'upsert' | 'selectOrderer' | 'multipleEdit'
  isExport?: boolean
  setSortedOrders?: Dispatch<SetStateAction<SelectedIcuOrder[]>>
  mainVetName?: string
  derCalcFactor?: number | null
  onOpenChange: () => void
  isEditTemplateMode?: boolean
}) {
  const { isEditOrderMode } = useIcuOrderStore()

  return (
    <Dialog open={orderStep !== 'closed'} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          onClick={onOpenChange}
          className="shrink-0"
        >
          <Plus size={18} />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl overflow-x-auto">
        <DialogHeader>
          {orderStep === 'upsert' && (
            <DialogTitle>오더 {isEditOrderMode ? '수정' : '추가'}</DialogTitle>
          )}
          {orderStep === 'multipleEdit' && (
            <DialogTitle>오더 복사 / 오더 삭제</DialogTitle>
          )}
          {orderStep === 'selectOrderer' && (
            <DialogTitle>수의사 선택</DialogTitle>
          )}
          <DialogDescription />
        </DialogHeader>
        {orderStep === 'upsert' && icuChartId && (
          <Tabs defaultValue="default">
            <TabsList className="grid max-w-full grid-cols-2 overflow-x-auto whitespace-nowrap">
              <TabsTrigger value="default">직접 입력</TabsTrigger>
              <TabsTrigger value="template" disabled={isEditOrderMode}>
                템플릿 오더 추가
              </TabsTrigger>
            </TabsList>

            {/* 오더 직접 추가 (기본값) */}
            <TabsContent value="default">
              {!isExport && (
                <LazyOrderForm
                  hosId={hosId}
                  showOrderer={showOrderer}
                  icuChartId={icuChartId}
                  species={patient?.species}
                  weight={weight}
                  ageInDays={ageInDays}
                  derCalcFactor={derCalcFactor}
                  setSortedOrders={setSortedOrders}
                  isEditTemplateMode={isEditTemplateMode}
                />
              )}
            </TabsContent>

            {/* 템플릿 오더 추가 */}
            <TabsContent value="template">
              <LazyTemplateTabContent hosId={hosId} icuChartId={icuChartId} />
            </TabsContent>
          </Tabs>
        )}

        {orderStep === 'upsert' && !icuChartId && !isExport && (
          <LazyOrderForm
            hosId={hosId}
            showOrderer={showOrderer}
            icuChartId={icuChartId}
            species={patient?.species}
            weight={weight}
            ageInDays={ageInDays}
            derCalcFactor={derCalcFactor}
            setSortedOrders={setSortedOrders}
          />
        )}

        {orderStep === 'selectOrderer' && (
          <OrdererSelectStep
            icuChartId={icuChartId!}
            orders={orders!}
            mainVetName={mainVetName!}
          />
        )}
      </DialogContent>
    </Dialog>
  )
}
