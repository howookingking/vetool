import type { ChecklistWithPatientWithWeight } from '@/lib/services/checklist/checklist-data'
import ClTag from './cl-tag'
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
    checklist_group,
    checklist_id,
    checklist_tag,
    checklist_title,
    checklist_type,
    checklist_vet,
  } = checklistData

  return (
    <div className="mb-4 grid grid-cols-12 gap-2">
      <div className="col-span-3">
        <ClTitle title={checklist_title} checklistId={checklist_id} />
      </div>

      <div className="col-span-2">
        <ClType checklistId={checklist_id} type={checklist_type} />
      </div>

      <div className="col-span-3">
        <ClGroup
          checklistId={checklist_id}
          currentGroups={checklist_group ?? []}
        />
      </div>

      <div className="col-span-4">
        <ClVet checklistId={checklist_id} checklistVet={checklist_vet} />
      </div>

      <div className="col-span-12">
        <ClTag checklistTag={checklist_tag ?? ''} checklistId={checklist_id} />
      </div>
    </div>
  )
}
