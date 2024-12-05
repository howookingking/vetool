import Feedback from '@/components/hospital/feedback/feedback'
import HospitalHeader from '@/components/hospital/header/hospital-header'
import MobileSidebar from '@/components/hospital/sidebar/mobile-sidebar'
import Sidebar from '@/components/hospital/sidebar/sidebar'
import { getVetoolUserData } from '@/lib/services/auth/authorization'
import { getHosName } from '@/lib/services/hospital-home/get-hos-name'

export async function generateMetadata(props: {
  params: Promise<{ hos_id: string }>
}) {
  const params = await props.params
  const hosName = await getHosName(params.hos_id)
  return {
    title: hosName,
  }
}

export default async function Layout(props: {
  children: React.ReactNode
  params: Promise<{ hos_id: string }>
}) {
  const params = await props.params
  const vetoolUser = await getVetoolUserData()
  const isSuper = vetoolUser.is_super

  return (
    <div className="flex h-screen">
      <Sidebar hosId={params.hos_id} userData={vetoolUser} isSuper={isSuper} />

      <MobileSidebar
        hosId={params.hos_id}
        userData={vetoolUser}
        isSuper={isSuper}
      />

      <div className="ml-0 flex-1 md:ml-14">
        {/* 헤더 LAYOUT PLACEHOLDER*/}
        <HospitalHeader />

        <main className="mt-12 w-screen md:w-auto">{props.children}</main>
      </div>

      <Feedback />
    </div>
  )
}
