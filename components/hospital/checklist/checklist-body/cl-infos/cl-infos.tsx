import type { ChecklistWithPatientWithWeight } from '@/lib/services/checklist/checklist-data'
import ClTitle from './cl-title'
import ClType from './cl-type'
import ClVet from './cl-vet'
import ClGroup from './group/cl-group'

export default function ClInfos({
  checklistData,
}: {
  checklistData: ChecklistWithPatientWithWeight
}) {
  const {
    age_in_days,
    checklist_group,
    checklist_id,
    checklist_protocol,
    checklist_set,
    checklist_tag,
    checklist_timetable,
    checklist_title,
    checklist_type,
    checklist_vet,
    comment,
    created_at,
    due_date,
    end_date,
    end_time,
    hos_id,
    is_txing,
    start_time,
  } = checklistData

  return (
    <div className="mb-4 grid grid-cols-12 gap-2">
      <div className="col-span-4">
        <ClTitle title={checklist_title} checklistId={checklist_id} />
      </div>

      <div className="col-span-4">
        <ClType checklistId={checklist_id} type={checklist_type} />
      </div>

      <div className="col-span-4">
        <ClGroup
          checklistId={checklist_id}
          currentGroups={checklist_group ?? []}
        />
      </div>

      <div className="col-span-4">
        <ClVet checklistId={checklist_id} checklistVet={checklist_vet} />
      </div>
    </div>
  )
}
