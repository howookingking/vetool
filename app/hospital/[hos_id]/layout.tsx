import MobileHeader from '@/components/common/mobile-header'
import HospitalSidebar from '@/components/hospital/sidebar/hospital-sidebar'
import { fetchHosName } from '@/lib/services/hospital-home/home'

export async function generateMetadata(props: {
  params: Promise<{ hos_id: string }>
}) {
  const { hos_id } = await props.params
  const hosName = await fetchHosName(hos_id)

  return {
    title: hosName,
  }
}

type Props = {
  children: React.ReactNode
  params: Promise<{ hos_id: string }>
}

export default async function HospitalLayout(props: Props) {
  const params = await props.params

  return (
    <div className="flex">
      <HospitalSidebar hosId={params.hos_id} />

      <MobileHeader />

      <main className="ml-0 mt-12 flex-1 2xl:ml-10 2xl:mt-0">
        {props.children}
      </main>
    </div>
  )
}
