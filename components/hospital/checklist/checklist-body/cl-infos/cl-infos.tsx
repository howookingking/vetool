import type { ChecklistWithPatientWithWeight } from '@/lib/services/checklist/checklist-data'
import ClTitle from './cl-title'
import ClType from './cl-type'
import ClVets from './cl-vets'

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
    pre_info,
    start_time,
  } = checklistData

  return (
    <div className="mb-4 grid grid-cols-12 gap-2">
      <div className="col-span-6">
        <ClTitle title={checklist_title} checklistId={checklist_id} />
      </div>

      <div className="col-span-6">
        <ClType checklistId={checklist_id} type={checklist_type} />
      </div>

      <div className="col-span-12">
        <ClVets checklistId={checklist_id} checklistVet={checklist_vet!} />
      </div>

      {/* <div className="col-span-4">
        <InAndOutDate
          icuIoId={icu_io.icu_io_id}
          inDate={icu_io.in_date}
          outDueDate={icu_io.out_due_date}
          outDate={icu_io.out_date}
        />
      </div>

      <div className="col-span-2">
        <OwnerName
          ownerName={patient.owner_name ?? ''}
          patientId={patient.patient_id}
        />
      </div>

      <div className="col-span-2">
        <CpcrEtTube cpcrEtTube={icu_io.cpcr} icuIoId={icu_io.icu_io_id} />
      </div>

      <div className="col-span-2">
        <Cage cage={icu_io.cage ?? ''} icuIoId={icu_io.icu_io_id} />
      </div>

      <div className="col-span-2">
        <Urgency urgency={urgency} icuChartId={icu_chart_id} />
      </div>

      <div className="col-span-6">
        <Vets
          mainVet={main_vet}
          subVet={sub_vet}
          icuChartId={icu_chart_id}
          inCharge={in_charge}
        />
      </div>

      <div className="col-span-6">
        <Group currentGroups={icu_io.group_list} icuIoId={icu_io.icu_io_id} />
      </div>

      <div className="col-span-6">
        <ChiefComplaint
          chiefComplaint={icu_io.icu_io_cc}
          icuIoId={icu_io.icu_io_id}
        />
      </div>
      <div className="col-span-6">
        <Diagnosis diagnosis={icu_io.icu_io_dx} icuIoId={icu_io.icu_io_id} />
      </div> */}
    </div>
  )
}
