import Announcements from '@/components/announcements/announcements'
import { getAnnouncements } from '@/lib/services/super/announcement/announcement'

export default async function AnnouncementsPage() {
  const announcementList = await getAnnouncements()

  return <Announcements announcements={announcementList} />
}
