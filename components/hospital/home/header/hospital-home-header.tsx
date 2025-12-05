import AnnouncementsCarousel from '@/components/hospital/home/header/announcements-carousel'
import { fetchHospitalList } from '@/lib/services/hospital-home/home'
import { fetchAnnouncementTitles } from '@/lib/services/super/announcement/announcement'
import SuperHospitalSelector from './super-hospital-selector'

type Props = {
  isSuper: boolean
  hosId: string
}

export default async function HospitalHomeHeader({ isSuper, hosId }: Props) {
  const hosList = await fetchHospitalList(isSuper)
  const announcementTitlesData = await fetchAnnouncementTitles()

  return (
    <div className="z-30 flex h-12 w-full flex-col items-center justify-center border-b bg-white">
      {isSuper && <SuperHospitalSelector hosList={hosList} hosId={hosId} />}

      <AnnouncementsCarousel announcementTitlesData={announcementTitlesData} />
    </div>
  )
}
