import AnnouncementsCarousel from '@/components/hospital/home/header/announcements-carousel'
import { fetchHospitalList } from '@/lib/services/hospital-home/home'
import { fetchAnnouncementTitles } from '@/lib/services/super/announcement/announcement'
import SuperHospitalSelector from './super-hospital-selector'

export default async function HospitalHomeHeader({
  isSuper,
}: {
  isSuper: boolean
}) {
  const hosList = await fetchHospitalList()
  const announcementTitlesData = await fetchAnnouncementTitles()

  return (
    <div className="z-30 flex w-full flex-col items-center justify-center gap-2 border-b bg-white">
      {isSuper && <SuperHospitalSelector hosList={hosList} />}

      <AnnouncementsCarousel announcementTitlesData={announcementTitlesData} />
    </div>
  )
}
