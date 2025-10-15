import React from 'react'
import SuperHospitalSelector from './super-hospital-selector'
import AnnouncementsCarousel from '@/components/hospital/home/header/announcements-carousel'
import { fetchHospitalList } from '@/lib/services/hospital-home/home'
import { fetchAnnouncementTitles } from '@/lib/services/super/announcement/announcement'

type Props = {
  isSuper: boolean
  hosId: string
}

export default async function HospitalHomeHeader({ isSuper, hosId }: Props) {
  const hosList = await fetchHospitalList()
  const announcementTitlesData = await fetchAnnouncementTitles()

  return (
    <div className="fixed z-30 flex h-12 w-full items-center justify-center gap-2 border-b bg-white">
      {isSuper && <SuperHospitalSelector hosList={hosList} />}

      <AnnouncementsCarousel announcementTitlesData={announcementTitlesData} />
    </div>
  )
}
