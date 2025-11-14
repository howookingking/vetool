import AddOutOrVisitChartDialog from '@/components/hospital/icu/main/out-and-visit/add-out-or-visit-chart-dialog'
import OutTabContent from '@/components/hospital/icu/main/out-and-visit/icu-out-chart/out-tab-content'
import VisitTabContent from '@/components/hospital/icu/main/out-and-visit/visit-chart/visit-tab-content'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { getOutDuePatients } from '@/lib/services/icu/out-and-visit/icu-out-chart'

export default async function OutAndVisitPage(props: {
  params: Promise<{
    hos_id: string
    target_date: string
  }>
}) {
  const { hos_id, target_date } = await props.params
  const outDuePatients = await getOutDuePatients(hos_id, target_date)

  return (
    <div className="relative h-desktop">
      <Tabs defaultValue="out" className="p-2">
        <TabsList className="w-full">
          <TabsTrigger value="out" className="w-full">
            퇴원
          </TabsTrigger>

          <TabsTrigger value="visit" className="w-full" disabled>
            면회
          </TabsTrigger>
        </TabsList>

        {/* tab contents */}
        <TabsContent value="out">
          <OutTabContent outDuePatients={outDuePatients} />
          <AddOutOrVisitChartDialog
            hosId={hos_id}
            targetDate={target_date}
            type="out"
          />
        </TabsContent>

        <TabsContent value="visit">
          <VisitTabContent />
          <AddOutOrVisitChartDialog
            hosId={hos_id}
            targetDate={target_date}
            type="visit"
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}
