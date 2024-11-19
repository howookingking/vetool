import HospitalSelector from '@/components/hospital/header/hospital-selector'
import Notice from '@/components/hospital/home/notice/notice'
import Todo from '@/components/hospital/home/todo/todo'
import { isSuperAccount } from '@/lib/services/auth/authorization'
import { getHosList } from '@/lib/services/hospital-home/get-hos-name'
import { getNotices } from '@/lib/services/hospital-home/notice'
import { getTodos } from '@/lib/services/hospital-home/todo'

export default async function HospitalHomePage(props: {
  params: Promise<{ hos_id: string }>
}) {
  const params = await props.params
  const noticesData = await getNotices(params.hos_id)
  const todosData = await getTodos(params.hos_id)
  const hosList = await getHosList()
  const isSuper = await isSuperAccount()

  return (
    <div className="flex w-full flex-col gap-2 p-2 md:flex-row">
      {isSuper && <HospitalSelector hosList={hosList} />}

      <Notice noticesData={noticesData} hosId={params.hos_id} />
      <Todo todosData={todosData} hosId={params.hos_id} />
    </div>
  )
}
