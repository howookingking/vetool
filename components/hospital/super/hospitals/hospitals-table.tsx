import { hosListColumns } from '@/components/hospital/super/hospitals/hos-list-columns'
import DataTable from '@/components/ui/data-table'
import type { HosListData } from '@/types/hospital'

export default function HospitalTable({ hosList }: { hosList: HosListData[] }) {
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
