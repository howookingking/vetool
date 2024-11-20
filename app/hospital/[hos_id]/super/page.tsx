import SuperPageTabs from '@/components/hospital/super/super-page-tabs'
import { isSuperAccount } from '@/lib/services/auth/authorization'
import { getHosList } from '@/lib/services/hospital-home/get-hos-name'
import { redirect } from 'next/navigation'

export default async function SuperPage({
  searchParams,
}: {
  searchParams: Promise<{ date?: string }>
}) {
  const hosList = await getHosList()
  const isSuper = await isSuperAccount()
  const { date } = await searchParams

  if (!isSuper) {
    redirect('/')
  }

  return <SuperPageTabs hosList={hosList} dateRange={date ?? '1'} />
}
