import NoResultSquirrel from '@/components/common/no-result-squirrel'
import DataTable from '@/components/ui/data-table'
import { visitColumns } from './visit-columns'
import { getVisitPatients } from '@/lib/services/icu/out-and-visit/icu-out-chart'

export default async function VisitChart({
  hosId,
  targetDate,
}: {
  hosId: string
  targetDate: string
}) {
  const visitPatients = await getVisitPatients(hosId, targetDate)

  if (visitPatients.length === 0) {
    return <NoResultSquirrel text="면회예정 환자 없음" className="h-64" />
  }

  return <DataTable columns={visitColumns} data={visitPatients} />
}
