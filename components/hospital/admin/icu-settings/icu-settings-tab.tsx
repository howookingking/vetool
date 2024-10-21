import LargeLoaderCircle from '@/components/common/large-loader-circle'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Suspense } from 'react'
import DefaultOrdersTab from './default-orders/default-orders-tab'
import MaintenanceRateTab from './maintenance-rate/maintenace-rate-tab'
import MemoNameTab from './memo-name/memo-name-tab'
import OrderColorTab from './order-color/order-color-tab'
import OrdererTab from './orderer/orderer-tab'

export default function IcuSettingsTab({ hosId }: { hosId: string }) {
  return (
    <Tabs defaultValue="defaultOrder">
      <TabsList className="grid w-[500px] grid-cols-5">
        <TabsTrigger value="defaultOrder">기본차트</TabsTrigger>
        <TabsTrigger value="orderColor">오더색상</TabsTrigger>
        <TabsTrigger value="memo">메모이름</TabsTrigger>
        <TabsTrigger value="orderer">오더자</TabsTrigger>
        <TabsTrigger value="maintenanceRate">수액유지속도</TabsTrigger>
      </TabsList>

      <TabsContent value="defaultOrder">
        <Suspense fallback={<LargeLoaderCircle className="h-96" />}>
          <DefaultOrdersTab hosId={hosId} />
        </Suspense>
      </TabsContent>

      <TabsContent value="orderColor">
        <Suspense fallback={<LargeLoaderCircle className="h-96" />}>
          <OrderColorTab hosId={hosId} />
        </Suspense>
      </TabsContent>

      <TabsContent value="memo">
        <Suspense fallback={<LargeLoaderCircle className="h-96" />}>
          <MemoNameTab hosId={hosId} />
        </Suspense>
      </TabsContent>

      <TabsContent value="orderer">
        <Suspense fallback={<LargeLoaderCircle className="h-96" />}>
          <OrdererTab hosId={hosId} />
        </Suspense>
      </TabsContent>

      <TabsContent value="maintenanceRate">
        <Suspense fallback={<LargeLoaderCircle className="h-96" />}>
          <MaintenanceRateTab hosId={hosId} />
        </Suspense>
      </TabsContent>
    </Tabs>
  )
}