import Feedback from '@/components/hospital/feedback/feedback'
import HospitalHeader from '@/components/hospital/header/hospital-header'
import MobileSidebar from '@/components/hospital/sidebar/mobile-sidebar'
import Sidebar from '@/components/hospital/sidebar/sidebar'
import { getUserData, isSuperAccount } from '@/lib/services/auth/authorization'
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
  const userData = await getUserData()
  const hosName = await getHosName(params.hos_id)
  const isSuper = await isSuperAccount()

  return (
    <div className="flex h-screen">
      <Sidebar hosId={params.hos_id} userData={userData} />

      <MobileSidebar
        hosId={params.hos_id}
        userData={userData}
        hosName={hosName}
        isSuper={isSuper}
      />

      <div className="ml-0 flex-1 md:ml-14">
        {/* 가짜 헤더 */}
        <HospitalHeader />

        <main className="mt-12 w-screen md:w-auto">{props.children}</main>
      </div>

      <Feedback />
    </div>
  )
}
