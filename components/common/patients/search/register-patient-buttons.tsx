import PatientRegisterDialog from '@/components/common/patients/form/patient-register-dialog'
import UploadPatientArea from '@/components/common/patients/upload/upload-patient-area'

export default function RegisterPatientButton({ hosId }: { hosId: string }) {
  return (
    <div className="mr-10 flex items-center gap-1 2xl:mr-0">
      <PatientRegisterDialog hosId={hosId} />
      <UploadPatientArea />
    </div>
  )
}
