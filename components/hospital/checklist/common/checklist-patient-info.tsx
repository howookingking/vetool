import { Patient } from '@/types'
import PatientDetailInfo from '../../common/patient/patient-detail-info'
import { ChecklistWithPatientWithWeight } from '@/lib/services/checklist/get-checklist-data-client'

export default function ChecklistPatientInfo({
  checklistData,
}: {
  checklistData: ChecklistWithPatientWithWeight
}) {
  // 환자 정보와 몸무게를 한번에 가져오기 때문에 useEffect로 환자 데이터 fetching이 필요없으며 클라이언트 컴포넌트화 시킬 필요가 없음
  const {
    species,
    name,
    breed,
    gender,
    birth,
    is_alive,
    weight_measured_date,
    body_weight,
  } = checklistData.patient

  return (
    <PatientDetailInfo
      species={species}
      name={name}
      breed={breed}
      gender={gender}
      birth={birth}
      weight={body_weight}
      weightMeasuredDate={weight_measured_date}
      isAlive={is_alive}
    />
  )
}
