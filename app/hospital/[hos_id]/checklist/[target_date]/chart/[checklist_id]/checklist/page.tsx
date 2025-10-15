import NoResultSquirrel from '@/components/common/no-result-squirrel'
import ChecklistBody from '@/components/hospital/checklist/checklist-body/checklist-body'
import ChecklistHeader from '@/components/hospital/checklist/checklist-header/checklist-header'
import { fetchChecklistWithPatientWithWeight } from '@/lib/services/checklist/checklist-data'

export default async function PatientChecklistPage(props: {
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

      <ChecklistBody checklistData={checklistData} />
    </div>
  )
}
