import LargeLoaderCircle from '@/components/common/large-loader-circle'
import dynamic from 'next/dynamic'

const PreviewDialogContentDynamic = dynamic(
  () => import('@/components/hospital/common/preview/preview-dialog-content'),
  {
    // loading: () => <LargeLoaderCircle className="h-[574px]" />,
    ssr: false,
  },
)

export default PreviewDialogContentDynamic
