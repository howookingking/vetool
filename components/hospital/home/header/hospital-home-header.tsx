import React from 'react'
import SuperHospitalSelector from './super-hospital-selector'
import PatchesCarousel from './patches-carousel'
import { getHosList } from '@/lib/services/hospital-home/get-hos-name'
import { getPatchTitlesData } from '@/lib/services/super/patch/patch'

export default async function HospitalHomeHeader({
  isSuper,
  hosId,
}: {
  isSuper: boolean
  hosId: string
}) {
  const hosListData = await getHosList()
  const patchTitlesData = await getPatchTitlesData()
  return (
    <div className="fixed z-30 flex h-12 w-full items-center justify-center gap-2 border-b bg-white">
      {isSuper && <SuperHospitalSelector hosList={hosListData} />}

      <PatchesCarousel hosId={hosId} patchTitlesData={patchTitlesData} />
    </div>
  )
}
