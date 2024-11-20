import PatchItems from '@/components/hospital/patches/patch-items'
import { getPatchList } from '@/lib/services/super/patch/patch'

export default async function HospitalPatchesPage() {
  const patchList = await getPatchList()

  return <PatchItems patches={patchList} />
}
