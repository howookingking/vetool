import HospitalSelector from '@/components/hospital/header/hospital-selector'
import Notice from '@/components/hospital/home/notice/notice'
import Todo from '@/components/hospital/home/todo/todo'
import PatchesCarousel from '@/components/hospital/super/patches/patches-carousel'
import { getVetoolUserData } from '@/lib/services/auth/authorization'
import { getHosList } from '@/lib/services/hospital-home/get-hos-name'
import { getTodos } from '@/lib/services/hospital-home/todo'
import { getPatchTitlesData } from '@/lib/services/super/patch/patch'

export default async function HospitalHomePage(props: {
  params: Promise<{ hos_id: string }>
}) {
  const params = await props.params
  const todosData = await getTodos(params.hos_id)
  const hosListData = await getHosList()
  const patchTitlesData = await getPatchTitlesData()
  const vetoolUser = await getVetoolUserData()
  const isSuper = vetoolUser.is_super

  return (
    <div className="flex w-full flex-col gap-2 p-2 md:flex-row">
      {isSuper && <HospitalSelector hosList={hosListData} />}

      <PatchesCarousel
        hosId={params.hos_id}
        patchTitlesData={patchTitlesData}
      />

      <Notice hosId={params.hos_id} />

      <Todo todosData={todosData} hosId={params.hos_id} />
    </div>
  )
}
