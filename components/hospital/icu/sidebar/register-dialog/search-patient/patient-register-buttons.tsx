import PatientRegisterDialog from '@/components/hospital/patients/patient-register-dialog'
import UploadPatientArea from '@/components/hospital/patients/upload-patient-area'

export default function PatientRegisterButtons({ hosId }: { hosId: string }) {
  return (
    <div className="mr-10 flex items-center gap-2 2xl:mr-0">
      <PatientRegisterDialog hosId={hosId} />
      <UploadPatientArea />
    </div>
  )
}
