import PatchItems from '@/components/hospital/patches/patch-items'
import { getVetoolUserData } from '@/lib/services/auth/authorization'
import { getPatchList } from '@/lib/services/super/patch/patch'

export default async function HospitalPatchesPage() {
  const patchList = await getPatchList()
  const vetoolUser = await getVetoolUserData()
  const isSuper = vetoolUser.is_super

  return <PatchItems patches={patchList} isSuper={isSuper} />
}
