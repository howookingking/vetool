import { Button } from '@/components/ui/button'
import DataTable from '@/components/ui/data-table'
import type { Owner } from '@/types/'
import { ownerColumns } from './owner-columns'

export default function OwnerSearch({
  ownersData,
  setStep,
}: {
  ownersData: Owner[]
  setStep: (step: 'ownerSearch' | 'ownerRegister' | 'patientRegister') => void
}) {
  return (
    <>
      <DataTable
        columns={ownerColumns}
        data={ownersData}
        searchPlaceHolder="보호자번호, 이름, 연락처을 검색하세요"
        rowLength={8}
      />

      <Button
        onClick={() => setStep('ownerRegister')}
        className="absolute bottom-6 left-6"
      >
        새로운 보호자 등록
      </Button>
    </>
  )
}
