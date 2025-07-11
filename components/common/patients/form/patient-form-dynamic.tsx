import dynamic from 'next/dynamic'
import LargeLoaderCircle from '../../large-loader-circle'

const PatientFormDynamic = dynamic(
  () => import('@/components/common/patients/form/patient-form'),
  {
    loading: () => <LargeLoaderCircle className="h-[574px]" />,
    ssr: false,
  },
)

export default PatientFormDynamic
