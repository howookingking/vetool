import NoResultSquirrel from '@/components/common/no-result-squirrel'
import GotoPatchItemsButton from '@/components/hospital/patches/go-to-patch-items-button'
import PatchDetail from '@/components/hospital/patches/patch-detail'
import { getPatchDetailData } from '@/lib/services/super/patch/patch'

export default async function HospitalPatchPage(props: {
  params: Promise<{
    patch_id: string
  }>
}) {
  const { patch_id } = await props.params
  const patchDetailData = await getPatchDetailData(patch_id)

  if (!patchDetailData) {
    return (
      <NoResultSquirrel
        className="h-screen"
        text="패치 노트가 존재하지 않습니다"
      />
    )
  }

  return (
    <div className="space-y-2 p-2">
      <GotoPatchItemsButton />
      <PatchDetail patchDetailData={patchDetailData} />
    </div>
  )
}
