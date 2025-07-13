import LargeLoaderCircle from '@/components/common/large-loader-circle'
import dynamic from 'next/dynamic'

const VetsUpdateFormDynamic = dynamic(
  () =>
    import(
      '@/components/hospital/icu/main/chart/selected-chart/chart-body/chart-infos/vets/vets-update-form'
    ),
  {
    loading: () => <LargeLoaderCircle className="h-[200px]" />,
    ssr: false,
  },
)

export default VetsUpdateFormDynamic
