import AddOutChartDialog from '@/components/hospital/icu/main/out-and-visit/icu-out-chart/add-out-chart-dialog'
import OutTabContent from '@/components/hospital/icu/main/out-and-visit/icu-out-chart/out-tab-content'
import AddVisitChartDialog from '@/components/hospital/icu/main/out-and-visit/visit-chart/add-visit-chart-dialog'
import VisitTabContent from '@/components/hospital/icu/main/out-and-visit/visit-chart/visit-tab-content'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { getOutDuePatients } from '@/lib/services/icu/out-and-visit/icu-out-chart'
import { getVisitDuePatients } from '@/lib/services/icu/out-and-visit/icu-visit-chart'

export default async function OutAndVisitPage(props: {
  params: Promise<{
    hos_id: string
    target_date: string
  }>
}) {
  const { hos_id, target_date } = await props.params
  const outDuePatients = await getOutDuePatients(hos_id, target_date)
  const vistDuePatients = await getVisitDuePatients(hos_id, target_date)

  return (
    <div className="relative h-desktop">
      <Tabs defaultValue="out" className="p-2">
        <TabsList className="h-auto w-full">
          <TabsTrigger value="out" className="text-md w-full">
            퇴원
          </TabsTrigger>

          <TabsTrigger value="visit" className="text-md w-full">
            면회
          </TabsTrigger>
        </TabsList>

        {/* tab contents */}
        <TabsContent value="out">
          <OutTabContent outDuePatients={outDuePatients} />
          <AddOutChartDialog hosId={hos_id} targetDate={target_date} />
        </TabsContent>

        <TabsContent value="visit">
          <VisitTabContent vistDuePatients={vistDuePatients} />
          <AddVisitChartDialog hosId={hos_id} targetDate={target_date} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
