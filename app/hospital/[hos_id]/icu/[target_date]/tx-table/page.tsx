import NoResultSquirrel from '@/components/common/no-result-squirrel'
import TxTableContainer from '@/components/hospital/icu/main/tx-table/tx-table-container'
import { getIcuTxTableData } from '@/lib/services/icu/tx-table/get-icu-tx-table-data'

export default async function TxTablePage(props: {
  params: Promise<{
    hos_id: string
    target_date: string
    patient_id: string
  }>
}) {
  const { hos_id, target_date } = await props.params
  const txTableData = await getIcuTxTableData(hos_id, target_date)

  if (!txTableData) {
    return (
      <NoResultSquirrel
        text="실행할 처치가 없습니다"
        className="h-desktop flex-col"
        size="lg"
      />
    )
  }

  return <TxTableContainer txTableData={txTableData} />
}
