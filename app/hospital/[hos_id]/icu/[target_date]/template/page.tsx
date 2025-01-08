import Template from '@/components/hospital/icu/main/template/template'
import { getIcuCustomOrders } from '@/lib/services/icu/template/template'

export default async function TemplatePage(props: {
  params: Promise<{
    hos_id: string
    target_date: string
  }>
}) {
  const params = await props.params
  const templateCharts = await getIcuCustomOrders(params.hos_id as string)

  return (
    <div className="mt-12 flex h-mobile flex-col border-t p-2 2xl:mt-0 2xl:h-desktop 2xl:border-0">
      <Template templateCharts={templateCharts} />
    </div>
  )
}
