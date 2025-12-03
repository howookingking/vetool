import Announcements from '@/components/announcements/announcements'
import { fetchAnnouncements } from '@/lib/services/super/announcement/announcement'

export default async function AnnouncementsPage() {
  const announcementList = await fetchAnnouncements()

  return <Announcements announcements={announcementList} />
}
