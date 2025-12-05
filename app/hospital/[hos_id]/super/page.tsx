import SuperPageTabs from '@/components/hospital/super/super-page-tabs'
import { getVetoolUserData } from '@/lib/services/auth/authorization'
import { redirect } from 'next/navigation'

export default async function SuperPage() {
  const vetoolUser = await getVetoolUserData()
  const { is_super } = vetoolUser

  if (!is_super) redirect('/')

  return <SuperPageTabs isSuper={is_super} />
}
