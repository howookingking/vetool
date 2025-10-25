import AnnouncementsCarousel from '@/components/hospital/home/header/announcements-carousel'
import { fetchAnnouncementTitles } from '@/lib/services/super/announcement/announcement'

export default async function HospitalHomeHeader() {
  const announcementTitlesData = await fetchAnnouncementTitles()

  return (
    <div className="z-30 flex h-12 w-full flex-col items-center justify-center border-b bg-white">
      <AnnouncementsCarousel announcementTitlesData={announcementTitlesData} />
    </div>
  )
}
