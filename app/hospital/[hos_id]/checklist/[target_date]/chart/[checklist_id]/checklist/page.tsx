import NoResultSquirrel from '@/components/common/no-result-squirrel'
import ChecklistBodyContainer from '@/components/hospital/checklist/checklist-body/checklist-body-container'
import ClTimeIndicatorTable from '@/components/hospital/checklist/checklist-body/cl-time-indicator-table'
import ChecklistHeader from '@/components/hospital/checklist/checklist-header/checklist-header'
import { fetchChecklistWithPatientWithWeight } from '@/lib/services/checklist/checklist-data'

export default async function ChecklistBody(props: {
  params: Promise<{
    hos_id: string
    target_date: string
    checklist_id: string
  }>
}) {
  const { checklist_id, target_date, hos_id } = await props.params
  const checklistData = await fetchChecklistWithPatientWithWeight(checklist_id)

  if (!checklistData) {
    return (
      <NoResultSquirrel
        text="체크리스트가 없습니다"
        className="mt-40 flex-col"
        size="lg"
      />
    )
  }

  return (
    <div className="flex-col">
      <ChecklistHeader
        hosId={hos_id}
        targetDate={target_date}
        checklistData={checklistData}
      />

      <h3 className="m-3 text-xl font-bold">{checklistData.checklist_title}</h3>

      <ClTimeIndicatorTable checklistData={checklistData} />

      <ChecklistBodyContainer checklistData={checklistData} />
    </div>
  )
}
