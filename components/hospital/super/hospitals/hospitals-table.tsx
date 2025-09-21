import { hosListColumns } from '@/components/hospital/super/hospitals/hos-list-columns'
import DataTable from '@/components/ui/data-table'
import { HospitalList } from '@/lib/services/hospital-home/home'

export default function HospitalTable({
  hosList,
}: {
  hosList: HospitalList[]
}) {
  return (
    <div className="flex flex-col gap-4">
      <DataTable
        searchPlaceHolder="병원명, 지역, 사업자 등록번호, 플랜 검색"
        columns={hosListColumns}
        data={hosList}
      />
    </div>
  )
}
