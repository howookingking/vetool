import DesktopAdminSidebar from '@/components/hospital/admin/desktop-admin-sidebar'
import MobileAdminSidebar from '@/components/hospital/admin/mobile-admin-sidebar'
import { checkIsAdmin, getUser } from '@/lib/services/auth/authorization'

export default async function AdminLayout(props: {
  children: React.ReactNode
  params: Promise<{ hos_id: string }>
}) {
  const params = await props.params

  const authUser = await getUser()
  await checkIsAdmin(params.hos_id, authUser!.id)

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
