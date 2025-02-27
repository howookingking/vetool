import AnnouncementList from '@/components/announcements/announcement-list'
import HomepageHeader from '@/components/company/header/homepage-header'
import { getAnnouncementList } from '@/lib/services/super/announcement/announcement'
import { createClient } from '@/lib/supabase/server'

export default async function AnnouncementsPage() {
  const announcementList = await getAnnouncementList()
  const supabase = await createClient()
  const {
    data: { session },
  } = await supabase.auth.getSession()

  return (
    <>
      {!session && <HomepageHeader />}
      <AnnouncementList announcements={announcementList} />
    </>
  )
}
