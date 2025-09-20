import HospitalSidebar from '@/components/hospital/sidebar/hospital-sidebar'
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
  const loggdedInUser = await getVetoolUserData()

  return (
    <div className="flex h-screen">
      <HospitalSidebar hosId={params.hos_id} />

      <main className="ml-0 flex-1 2xl:ml-10">{props.children}</main>

      {/* <Message loggdedInUser={loggdedInUser} hosId={params.hos_id} /> */}
    </div>
  )
}
