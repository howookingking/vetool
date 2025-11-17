import DataTable from '@/components/ui/data-table'
import { visitDueColumn } from './visit-due-columns'
import { VisitDuePatents } from '@/lib/services/icu/out-and-visit/icu-visit-chart'

export default function VisitTabContent({
  vistDuePatients,
}: {
  vistDuePatients: VisitDuePatents[]
}) {
  const sortedVisitDuePatients = vistDuePatients.sort((a, b) => {
    const aDate = new Date(a.visit_chart?.created_at!)
    const bDate = new Date(b.visit_chart?.created_at!)
    return bDate.getTime() - aDate.getTime()
  })

  return (
    <DataTable
      columns={visitDueColumn}
      data={sortedVisitDuePatients}
      noResultText="면회예정 환자가 없습니다"
    />
  )
}
