import DesktopAdminSidebar from '@/components/hospital/admin/desktop-admin-sidebar'
import MobileAdminSidebar from '@/components/hospital/admin/mobile-admin-sidebar'
import { getVetoolUserData } from '@/lib/services/auth/authorization'
import { redirect } from 'next/navigation'

export default async function AdminLayout(props: {
  children: React.ReactNode
  params: Promise<{ hos_id: string }>
}) {
  const params = await props.params
  const vetoolUser = await getVetoolUserData()

  if (!vetoolUser.is_admin) {
    redirect(`/hospital/${params.hos_id}`)
  }

  return (
    <div className="flex flex-col md:flex-row">
      <DesktopAdminSidebar />

      <MobileAdminSidebar />

      <div className="h-exclude-header w-full overflow-auto p-2">
        {props.children}
      </div>
    </div>
  )
}
