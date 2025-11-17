import MobileTitle from '@/components/common/mobile-title'
import NoResultSquirrel from '@/components/common/no-result-squirrel'
import TxTableContainer from '@/components/hospital/icu/main/tx-table/tx-table-container'
import { fetchIcuTxTableData } from '@/lib/services/icu/tx-table/fetch-icu-tx-table-data'
import { ListChecksIcon } from 'lucide-react'

export default async function TxTablePage(props: {
  params: Promise<{
    hos_id: string
    target_date: string
  }>
}) {
  const { hos_id, target_date } = await props.params
  const txTableData = await fetchIcuTxTableData(hos_id, target_date)

  return (
    <>
      <MobileTitle title="처치표" icon={ListChecksIcon} />

      {!txTableData ? (
        <NoResultSquirrel
          text={
            <div className="flex flex-col items-center leading-5">
              <div>{target_date}</div>
              <span>실행할 처치가 없습니다</span>
            </div>
          }
          className="h-mobile flex-col 2xl:h-desktop"
          size="lg"
        />
      ) : (
        <TxTableContainer
          txTableData={txTableData}
          hosId={hos_id}
          targetDate={target_date}
        />
      )}
    </>
  )
}
