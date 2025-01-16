import LargeLoaderCircle from '@/components/common/large-loader-circle'
import OrdererSelectStep from '@/components/hospital/icu/main/chart/selected-chart/chart-body/table/order/orderer/orderer-select-step'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import type { SelectedIcuOrder } from '@/types/icu/chart'
import dynamic from 'next/dynamic'
import { Dispatch, SetStateAction } from 'react'

const LazyOrderForm = dynamic(() => import('./order-form'), {
  ssr: false,
  loading: () => <LargeLoaderCircle className="h-[388px]" />,
})
const LazyTemplateTable = dynamic(
  () => import('./template/template-tab-content'),
  {
    ssr: false,
    loading: () => <LargeLoaderCircle className="h-[388px]" />,
  },
)

type OrderDialogProps = {
  hosId: string
  icuChartId: string
  orders: SelectedIcuOrder[]
  showOrderer: boolean
  orderStep: 'closed' | 'upsert' | 'selectOrderer' | 'multipleEdit'
  isEditOrderMode?: boolean
  setOrderStep: (
    orderStep: 'closed' | 'upsert' | 'selectOrderer' | 'multipleEdit',
  ) => void
  reset: () => void
  isExport?: boolean
  setSortedOrders: Dispatch<SetStateAction<SelectedIcuOrder[]>>
  mainVetName: string
  derCalcFactor: number | null
}

export default function OrderDialog({
  hosId,
  icuChartId,
  orders,
  showOrderer,
  orderStep,
  isEditOrderMode,
  setOrderStep,
  reset,
  isExport,
  setSortedOrders,
  mainVetName,
}: OrderDialogProps) {
  const handleOpenChange = () => {
    if (orderStep === 'closed') {
      setOrderStep('upsert')
    } else {
      setOrderStep('closed')
    }
    reset()
  }

  return (
    <Dialog open={orderStep !== 'closed'} onOpenChange={handleOpenChange}>
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

        {orderStep === 'upsert' &&
          // <Tabs defaultValue="default">
          //   <TabsList
          //     className={cn(
          //       'hidden max-w-full grid-cols-1 overflow-x-auto whitespace-nowrap md:grid',
          //     )}
          //   >
          //     {isEditOrderMode ? (
          //       <TabsTrigger value="default">직접 입력</TabsTrigger>
          //     ) : (
          //       <TabsTrigger value="template">템플릿 오더 추가</TabsTrigger>
          //     )}
          //   </TabsList>

          //   {/* 오더 직접 추가 (기본값) */}
          //   <TabsContent value="default">
          //     {!isExport && (
          //       <LazyOrderForm
          //         showOrderer={showOrderer}
          //         icuChartId={icuChartId}
          //         setSortedOrders={setSortedOrders}
          //       />
          //     )}
          //   </TabsContent>

          //   {/* 템플릿 오더 추가 */}
          //   <TabsContent value="template">
          //     <LazyTemplateTabContent hosId={hosId} icuChartId={icuChartId} />
          //   </TabsContent>
          // </Tabs>

          (isEditOrderMode ? (
            <LazyOrderForm
              showOrderer={showOrderer}
              icuChartId={icuChartId}
              setSortedOrders={setSortedOrders}
            />
          ) : (
            <LazyTemplateTable hosId={hosId} icuChartId={icuChartId} />
          ))}

        {orderStep === 'selectOrderer' && (
          <OrdererSelectStep
            icuChartId={icuChartId}
            orders={orders}
            mainVetName={mainVetName}
          />
        )}
      </DialogContent>
    </Dialog>
  )
}
