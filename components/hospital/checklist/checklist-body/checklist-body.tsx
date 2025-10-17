import type { ChecklistWithPatientWithWeight } from '@/lib/services/checklist/checklist-data'
import ClInfos from './cl-infos/cl-infos'
import ClTxMemos from './cl-tx-memo/cl-tx-memos'

export default function ChecklistBody({
  checklistData,
}: {
  checklistData: ChecklistWithPatientWithWeight
}) {
  return (
    <div className="p-2">
      <ClInfos checklistData={checklistData} />

      <ClTxMemos
        checklistId={checklistData.checklist_id}
        txMemoA={checklistData.tx_memo_a}
        txMemoB={checklistData.tx_memo_b}
      />

      {/* <ClTimeIndicator checklistData={checklistData} /> */}

      {/* <ChecklistBodyContainer checklistData={checklistData} /> */}
    </div>
  )
}
