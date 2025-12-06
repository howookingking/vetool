import type { PatientWithWeight } from '@/lib/services/patient/patient'
import { formatDate } from 'date-fns'
import PatientDetailInfo from '../common/patient/patient-detail-info'

export default function SelectedPatient({
  patientData,
}: {
  patientData: PatientWithWeight
}) {
  return (
    <div className="flex justify-center rounded-none border-2 border-primary py-2 animate-in">
      <PatientDetailInfo
        {...patientData.patient}
        weight={patientData.vital?.body_weight ?? ''}
        weightMeasuredDate={
          patientData.vital?.created_at &&
          formatDate(new Date(patientData.vital.created_at), 'yyyy-MM-dd')
        }
      />
    </div>
  )
}
