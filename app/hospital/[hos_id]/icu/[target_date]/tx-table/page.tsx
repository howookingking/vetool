import NoResultSquirrel from '@/components/common/no-result-squirrel'
import TxTableContainer from '@/components/hospital/icu/main/tx-table/tx-table-container'
import { fetchIcuTxTableData } from '@/lib/services/icu/tx-table/fetch-icu-tx-table-data'

export default async function TxTablePage(props: {
  params: Promise<{
    hos_id: string
    target_date: string
  }>
}) {
  const { hos_id, target_date } = await props.params
  const txTableData = await fetchIcuTxTableData(hos_id, target_date)

  if (!txTableData) {
    return (
      <NoResultSquirrel
        text={`${target_date} 실행할 처치가 없습니다`}
        className="h-desktop flex-col"
        size="lg"
      />
    )
  }

  return <TxTableContainer txTableData={txTableData} />
}
