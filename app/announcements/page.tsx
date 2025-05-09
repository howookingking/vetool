import Announcements from '@/components/announcements/announcements'
import HomepageHeader from '@/components/company/header/homepage-header'
import { fetchAnnouncements } from '@/lib/services/super/announcement/announcement'
import { createClient } from '@/lib/supabase/server'

export default async function AnnouncementsPage() {
  const announcementList = await fetchAnnouncements()
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <>
      {!user && <HomepageHeader />}
      <Announcements announcements={announcementList} />
    </>
  )
}
