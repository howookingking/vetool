import SuperPageTabs from '@/components/hospital/super/super-page-tabs'
import { getVetoolUserData } from '@/lib/services/auth/authorization'
import { getHosList } from '@/lib/services/hospital-home/get-hos-name'
import { redirect } from 'next/navigation'

export default async function SuperPage() {
  const hosList = await getHosList()
  const vetoolUser = await getVetoolUserData()
  const isSuper = vetoolUser.is_super
  if (!isSuper) {
    redirect('/')
  }

  return <SuperPageTabs hosList={hosList} />
}
