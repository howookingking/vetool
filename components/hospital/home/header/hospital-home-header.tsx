import React from 'react'
import SuperHospitalSelector from './super-hospital-selector'
import AnnouncementsCarousel from '@/components/hospital/home/header/announcements-carousel'
import { getHosList } from '@/lib/services/hospital-home/get-hos-name'
import { getAnnouncementTitlesData } from '@/lib/services/super/announcement/announcement'

type Props = {
  isSuper: boolean
  hosId: string
}

export default async function HospitalHomeHeader({ isSuper, hosId }: Props) {
  const hosListData = await getHosList()
  const announcementTitlesData = await getAnnouncementTitlesData()
  return (
    <div className="fixed z-30 flex h-12 w-full items-center justify-center gap-2 border-b bg-white">
      {isSuper && <SuperHospitalSelector hosList={hosListData} />}

      <AnnouncementsCarousel announcementTitlesData={announcementTitlesData} />
    </div>
  )
}
